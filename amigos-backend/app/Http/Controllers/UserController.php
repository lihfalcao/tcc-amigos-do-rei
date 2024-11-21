<?php
namespace App\Http\Controllers;

use App\Models\User;
use App\Repositories\UserRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;


class UserController extends Controller
{
    protected $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    // Criar um novo usuário
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:50',
            'phone' => 'nullable|string|max:50',
            'email' => 'required|email|max:50|unique:users',
            'login' => 'required|string|max:50|unique:users',
            'password' => 'required|string|min:8',
            'type' => 'required|in:admin,parent,professor',
            'status' => 'boolean',
            'gender' => 'nullable|string|max:50'
        ]);

        $data['password'] = Hash::make($data['password']);

        $user = $this->userRepository->create($data);

        return response()->json($user, 201);
    }

    // Atualizar um usuário
    public function update(Request $request, User $user)
    {
        $data = $request->validate([
            'name' => 'string|max:50',
            'phone' => 'nullable|string|max:50',
            'email' => 'email|max:50|unique:users,email,' . $user->id,
            'login' => 'string|max:50|unique:users,login,' . $user->id,
            'password' => 'nullable|string|min:8',
            'type' => 'in:admin,parent,professor',
            'status' => 'boolean',
        ]);

        if (!empty($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        }

        $this->userRepository->update($user->id, $data);

        return response()->json($user, 200);
    }

    // Deletar um usuário
    public function destroy(User $user)
    {
        $this->userRepository->delete($user);

        return response()->json(['message' => 'User deleted successfully'], 200);
    }

    // Login do usuário e gerar token
    public function login(Request $request)
    {
        // Validação
        $credentials = $request->validate([
            'login' => 'required|string',
            'password' => 'required|string',
            'rememberMe' => 'required|boolean',
        ]);

        $user = $this->userRepository->findByLogin($credentials['login']);

        if (!$user || !Hash::check($credentials['password'], $user->password)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        // Criar token Sanctum
        $token = $user->createToken('auth_token')->plainTextToken;

        // Dentro da função login, ao definir o cookie
        if ($credentials['rememberMe']) {
            $rememberToken = Str::random(10);
            $user->remember_token = $rememberToken;
            $user->save();

            // Armazena no cookie com um caminho específico
            Cookie::queue(Cookie::make('remember_token', $rememberToken, 43200, '/', null, false, true)); // Adicionando '/' como caminho
        }


        return response()->json(['token' => $token, 'name' => $user->name], 200);
    }



    // Logout do usuário
    public function logout(Request $request)
    {
        $request->user()->tokens()->delete(); 
        return response()->json(['message' => 'Logged out successfully']);
    }

    public function loggedUser()
    {
        $user = Auth::guard('sanctum')->user();

        if (!$user) {
            return response()->json(['message' => 'Usuário não autenticado'], 401);
        }
         
        return response()->json(['user' => $this->userRepository->loggedUser($user)]);
    }

    public function updateLoggedUser(Request $request)
    {
        $user = Auth::guard('sanctum')->user();

        if (!$user) {
            return response()->json(['message' => 'Usuário não autenticado'], 401);
        }

        $data = $request->validate([
            'name' => 'string|max:50',
            'phone' => 'nullable|string|max:50',
            'email' => 'email|max:50|unique:users,email,' . $user->id,
            'login' => 'string|max:50|unique:users,login,' . $user->id,
            'password' => 'nullable|string|min:8',
        ]);

        if (!empty($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        }

        $this->userRepository->updateLoggedUser($user, $data);

        return response()->json($user, 200);
    }

    public function uploadAvatar(Request $request)
    {
        $request->validate([
            'avatar' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048', // Validações para o arquivo
        ]);

        $user = Auth::guard('sanctum')->user();

        if (!$user) {
            return response()->json(['message' => 'Usuário não autenticado'], 401);
        }

        // Verifica se o usuário já possui um avatar e o remove
        if ($user->avatar) {
            Storage::disk('public')->delete('images/avatar/' . $user->avatar);
        }

        // Salva o novo avatar
        $avatarName = $user->name . '_' . time() . '.' . $request->avatar->extension();
        $request->avatar->storeAs('avatars', $avatarName, 'public');

        // Atualiza o campo `avatar` na tabela `users`
        $user->avatar = $avatarName;
        $user->save();

        return response()->json([
            'message' => 'Avatar atualizado com sucesso!',
            'avatar_url' => asset('storage/avatars/' . $avatarName),
        ]);
    }

}
