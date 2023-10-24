<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Support\Facades\Mail;
use App\Mail\VerificationMail;
use Illuminate\Support\Str;

class APIController extends Controller
{
    // register a new user
    public function register(Request $request){

        $firstName = $request->firstName;
        $lastName = $request->lastName;
        $middleName = $request->middleName;
        $phone = $request->phoneNumber;
        $email = $request->email;
        $password = $request->password;
        $type = $request->userType;
        $id = $request->file;

        if(User::where('email', $email)->count() > 0){
            return response()->json(['status' => 'failed', 'message'=>'Email already exists', 'status_code' => 401]);
        }
        if ($request->hasFile('file')) {
                $file = $request->file('file');
                $fileName = $file->getClientOriginalName();   
            }

            $emailVerificationToken = Str::random(40); // email verification token
            $user = User::create([
            'firstName' => $firstName,
            'lastName' => $lastName,
            'middleName' => $middleName,
            'phone' => $phone,
            'email' => $email,
            'password' => Hash::make($password),
            'userType' => $type,
            'profile_file' => $fileName,
            'email_verification_token' => $emailVerificationToken
        ]);

        // define email data


        // create a folder if it doesn't exist
        $userFolder = public_path('user_ids/' . $user->id);
        if (!file_exists($userFolder)) {
            mkdir($userFolder, 0777, true);
        }

        // Save the uploaded file in the respective folder
        if($user){
            
            $name = $firstName.' '.$lastName;
            // define email data
            $data = [
                'name' => $name,
                'email' => $email,
                'link' => 'https://api.imbapano.com/user/auth/verification/'.$emailVerificationToken
            ];

            Mail::to($email)->send(new VerificationMail($data));
            $file->move($userFolder, $fileName);
            $token = $user->createToken('auth_token')->plainTextToken;
            $tokenType = 'Bearer '.$token;

            return response()->json(['status' => 'success', 'status_code' => 201, 'user' => $user, 'token' => $tokenType], 201);

        }
    }
}

/*

impaAX5S#k$lK!3Jbano
*/