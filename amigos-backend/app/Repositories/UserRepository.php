<?php
namespace App\Repositories;

use App\Models\User;

class UserRepository
{
    public function create(array $data)
    {
        return User::create($data);
    }


    public function update(int $id, array $data)
    {
        $user = User::findOrFail($id);

        return $user->update($data);
    }
    

    public function delete(User $user)
    {
        return $user->delete();
    }

    public function findByLogin(string $login)
    {
        return User::where('login', $login)->where('status', true)->first();
    }

    public function loggedUser(User $user){
        return User::where('id', $user->id)
                    ->with(['professorHasClasses.class'])
                    ->first();
    }

    public function updateLoggedUser(User $user, $data){
        return $user->update($data);
    }
}
