<?php
namespace App\Http\Controllers;

use App\Models\User;
use App\Repositories\UserRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
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
        $credentials = $request->validate([
            'login' => 'required|string',
            'password' => 'required|string',
            'rememberMe' => 'required|boolean',
        ]);

        $user = $this->userRepository->findByLogin($credentials['login']);

        if (!$user || !Hash::check($credentials['password'], $user->password)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        $token = $user->createToken('auth_token')->plainTextToken;
        if ($credentials['rememberMe']) {
            $rememberToken  = Str::random(10);
            $user->remember_token = $rememberToken ;
            $user->save();

            // Armazene o token em um cookie que expira em 30 dias
            Cookie::queue('remember_token', $token, 43200); // 30 dias
        }
        

        return response()->json(['token' => $token, 'name' => $user->name], 200);
    }

    // Logout do usuário
    public function logout()
    {
        Auth::logout();
        Cookie::forget('remember_token');

        Auth::user()->tokens()->delete();

        return response()->json(['message' => 'Logged out successfully'], 200);
    }

   

}