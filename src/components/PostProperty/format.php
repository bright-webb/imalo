<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Property;
use App\Models\PropertyFeatures;
use Illuminate\Support\Facades\Mail;
use App\Mail\VerificationMail;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use libphonenumber\PhoneNumberUtil;
use libphonenumber\PhoneNumberFormat;
use Twilio\Rest\Client;
use Illuminate\Support\Facades\File;



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
        $country = $request->country;
        $file = $request->file;
        if(empty($country)){
            return response()->json(['status' => 'failed', 'message' => 'Please select your country', 'status_code' => 401]);
            exit(0);
        }
        
         if(empty($type)){
            return response()->json(['status' => 'failed', 'message' => 'Please select your user type', 'status_code' => 401]);
            exit(0);
        }
        if(User::where('email', $email)->count() > 0){
            return response()->json(['status' => 'failed', 'message'=>'Email already exists', 'status_code' => 401]);
        }
        
        if(User::where('phone', $phone)->count() > 0){
            return response()->json(['status' => 'failed', 'message' => 'Phone Number already exists', 'status_code' => 401]);
        }
        

    
                $fileName = '';
                $filePath = '';
                    if ($request->hasFile('file')) {
                        $userFolder = public_path('user_ids');
                        if (!file_exists($userFolder)) {
                            mkdir($userFolder, 0777, true);
                        }
                        
                        if(is_dir("$userFolder/ID")){
                            mkdir("$userFolder/ID");
                        }
                        
                        $uploadFolder = public_path("$userFolder/ID");
                        $file = $request->file('file');
                        $originalFileName = $file->getClientOriginalName(); 
                        $extension = $file->getClientOriginalExtension();
                        $fileName = time() . '.' . $extension; // Generate a unique file name
                        $filePath = $file->move($userFolder, $fileName);
                        $filePath = url($filePath);
                        
                    }


            $emailVerificationToken = Str::random(100); // email verification token
            $user = User::create([
            'firstName' => $firstName,
            'lastName' => $lastName,
            'middleName' => $middleName,
            'phone' => $phone,
            'email' => $email,
            'password' => Hash::make($password),
            'userType' => $type,
            'profile_file' => $fileName,
            'profile_path' => $filePath,
            'country' => $country,
            'email_verification_token' => $emailVerificationToken
        ]);
        
        // send otp for phone number verification
        $phoneUtil = \libphonenumber\PhoneNumberUtil::getInstance();
        
        $phoneUtil = PhoneNumberUtil::getInstance();
        $numberProto = $phoneUtil->parse($phone, $country);
        $phone = $phoneUtil->format($numberProto, PhoneNumberFormat::INTERNATIONAL);
        
        // $twilioSid = 'AC7babbf5416425bfc76d2d3f9eb4f934b';
        // $twilioToken = '93c77c09be87b6051c12571981643f47';
        $otp = mt_rand(100000, 999999);
       
        // check if phone number starts with a + then remove it
        // if(strpos($phone, '+') === 0){
        //     $phone = str_replace(['+', ' '], '', $phone);
        // }
        // elseif (strpos($phone, '0') === 0) {
        //         // Replace '0' with '234'
        //         $phone = '234' . substr($phone, 1);
        //     }
        
       
        if($user){
            $id = $user->id;
        
        if($this->sendPhoneVerificationCode($otp, $phone)){
            $this->saveOtp($id, $otp);
        }
            $name = $firstName.' '.$lastName;
            $token = $user->createToken('auth_token')->plainTextToken;
            $tokenType = 'Bearer '.$token;
            // define email data
            $data = [
                'name' => $name,
                'email' => $email,
                'link' => 'https://api.imbapano.com/user/auth/verification/'.$token.'?auth='.$emailVerificationToken
            ];

            Mail::to($email)->send(new VerificationMail($data));
           
            

            return response()->json(['status' => 'success', 'status_code' => 201, 'user' => $user, 'token' => $tokenType], 201);

        }
    }
    
   
    // send otp code
    public function sendOtp(Request $request){
        $user =  auth('sanctum')->user();
        $country = $user->country;
        $phone = $user->phone;
        $phone = str_replace('"', '', $phone);
        $phoneUtil = \libphonenumber\PhoneNumberUtil::getInstance();
        
        $phoneUtil = PhoneNumberUtil::getInstance();
        $numberProto = $phoneUtil->parse($phone, $country);
        $phone = $phoneUtil->format($numberProto, PhoneNumberFormat::INTERNATIONAL);
        
        // $twilioSid = 'AC7babbf5416425bfc76d2d3f9eb4f934b';
        // $twilioToken = '93c77c09be87b6051c12571981643f47';
        $otp = mt_rand(100000, 999999);
       
        // check if phone number starts with a + then remove it
        // if(strpos($phone, '+') === 0){
        //     $phone = str_replace(['+', ' '], '', $phone);
        // }
        // elseif (strpos($phone, '0') === 0) {
        //         // Replace '0' with '234'
        //         $phone = '234' . substr($phone, 1);
        //     }
        
       
        
        $id = $user->id;
        if(DB::table('otp')->where('user_id', $id)->count()){
             DB::table('otp')->where('user_id', $id)->delete();
        }
       
        if($this->sendPhoneVerificationCode($otp, $phone)){
            $this->saveOtp($id, $otp);
            return response()->json(['status' => 'success', 'status_code' => 201, 'message' => "A new otp code has been sent to mobile number: $phone "], 200);
        }
        else{
           $user = User::find($id);
            if ($user) {
                $user->delete();
            }
            return response()->json(['status' => 'failed', 'status_code' => 401, 'message' => 'Something went wrong, please try again'], 401);
        }
        
        
    }
    
    
    public function verifyOtp(Request $request){
        // return 'hello world';
        
        $user = auth('sanctum')->user();
        $otp = $request->input('otp');
        
        
        $id = $user->id;
        if(DB::table('otp')->where(['otp_code' => $otp, 'user_id' => $id])->count() > 0){
            DB::table('otp')->where(['user_id' => $id])->delete();
            User::where('id', $id)->update(['is_verified' => true]);
            return response()->json(['status' => 'success', 'status_code' => 201]);
        }
        else{
            return response(['status' => 'failed', 'status_code' => 401, 'message' => 'The code provided is not correct']);
        }
    }
    
    // login
    public function login(Request $request){
        $credentials = $request->only('email', 'password');
    if (Auth::attempt($credentials)) {
        $user = Auth::user();
        $token = $user->createToken('authToken')->plainTextToken;
        return response()->json([
            'status_code' => 201,
            'user' => $user,
            'token' => $token
        ], 200);
        } else {
            return response()->json(['error' => 'Unauthorized', 'status_code' => 401, 'message' => 'Invalid login credentials']);
        }
    }
    
    
    // send phone number verification token
private function sendPhoneVerificationCode($otp, $phone){
   try{
        $twilioAccountSid = 'AC7babbf5416425bfc76d2d3f9eb4f934b';
        $twilioAuthToken = '93c77c09be87b6051c12571981643f47';
        
        $twilio = new Client($twilioAccountSid, $twilioAuthToken);
        $message = $twilio->messages->create($phone, [
            "body" => "Your Verification code is: " . $otp,
            "from" => '+12566661205'
        ]);
        if($message->sid){
            return true;
        }
        else{
            return false;
        }
   } catch(Exception $e) {
       return false;
   }
}

    
    private function saveOtp($user, $otp){
        // check if user already has otp and update it instead of inserting a new one
        if(DB::table('otp')->where(['user_id' => $user])->exists()){
            DB::table('otp')->where(['user_id' => $user])->update(['user_id' => $user, 'otp_code' => $otp]);
        }
        else{
            DB::table('otp')->insert(['user_id' => $user, 'otp_code' => $otp]);
        }
        
    }
    
    
// upload properties photos
public function uploadFiles(Request $request){
   
  $user = Auth::user();
 
    $userId = $user->id;
        
        $property_id = $request->property_id;
     if ($request->hasFile('files')) {
            $files = $request->file('files');
            $filePaths = []; // Initialize an array to hold all file paths
        
            foreach ($files as $file) {
                if ($file->isValid()) {
                    // Generate a unique file name for the file
                    $fileName = time() . '_' . $userId . '_' . $file->getClientOriginalName();
        
                    // Store the file in the user's temporary directory
                    $file->move($publicDirectory, $fileName);
                    $filePath = 'property_images/' . $fileName;
        
                    // Add the file path to the array
                    $filePaths[] = $filePath;
        
                    // Insert the file information into the database
                    DB::table('property_images')->insert([
                        'property_id' => $property_id,
                        'image' => $fileName,
                        'image_path' => $filePath
                    ]);
                }
            }
        
            // Return a JSON response with all file paths
            return response()->json(['filePaths' => $filePaths, 'message' => 'Files uploaded successfully', 'status_code' => 201], 201);
        }


        return response()->json(['error' => 'No valid files were uploaded'], 400);
    
}

// add new property
public function newProperty(Request $request){
  $user = Auth::user();
  $id = $user->id;
    // $propertyTitle = $request->propertyTitle;
   
    $propertyTitle = $request->input('propertyTitle');
    $propertyRequest = $request->input('propertyRequest');
    $category = $request->input('category');
    $price = $request->input('price');
    $distressSale = $request->input('distressSale');
    $description = $request->input('description');
    $province = $request->input('province');
    $phoneNumber = $request->input('phoneNumber');
    $address = $request->input('address');
    
  
    exit();
    
    // Extract features from the JSON request
    $features = $request->input('features', []);
    $bedroom = $features['bedroom'] ?? false;
    $parlor = $features['parlor'] ?? false;
    $kitchen = $features['kitchen'] ?? false;
    $toilet = $features['toilet'] ?? false;
    $waterHeater = $features['waterHeader'] ?? false;
    $tightSecurity = $features['tightSecurity'] ?? false;
    
 
            
        // if amount entered is a valid numeric data
       if(!is_numeric($price)){
            return response()->json(['status_code' => 401, 'message' => 'Please enter a valid amount']);
            exit(0);
        }
        
      /* check square metre entered is a valid numeric */
   
  
        
        $property = new Property();
        $property->user_id = $id;
        $property->property_title = $propertyTitle;
        $property->property_request = $propertyRequest;
        $property->property_category = $category;
        $property->price = $price;
        $property->distress_deal = $distressSale;
        $property->property_description = $description;
        $property->province = $province;
        $property->address = $address;
        $property->phone_number = $phoneNumber;
       
    
        if($property->save()){
            
            $propertyFeatures = new PropertyFeatures;
            $propertyFeatures->property_id = $property->id;
                $propertyFeatures->tight_security = $tightSecurity;
                $propertyFeatures->bedroom = $bedroom;
                $propertyFeatures->toilet = $toilet;
                $propertyFeatures->kitchen = $kitchen;
                $propertyFeatures->parlor = $parlor;
                $propertyFeatures->water_heater = $waterHeater;
                
                     if ($request->hasFile('files')) {
                         $publicDirectory  = 'property_images';
        
                            $userFolder = public_path('user_ids/'.$userId);
                            if (!file_exists($userFolder)) {
                                mkdir($userFolder, 0777, true);
                            }
                                            
                            if (!file_exists($publicDirectory) && !is_dir($publicDirectory)) {
                                mkdir($publicDirectory, 0777, true);
                                
                            }
                    $files = $request->file('files');
                    $filePaths = []; // Initialize an array to hold all file paths
        
                        foreach ($files as $file) {
                            if ($file->isValid()) {
                                // Generate a unique file name for the file
                                $fileName = time() . '_' . $userId . '_' . $file->getClientOriginalName();
                    
                                // Store the file in the user's temporary directory
                                $file->move($publicDirectory, $fileName);
                                $filePath = 'property_images/' . $fileName;
                    
                                // Add the file path to the array
                                $filePaths[] = $filePath;
                    
                                // Insert the file information into the database
                                DB::table('property_images')->insert([
                                    'property_id' => $property_id,
                                    'image' => $fileName,
                                    'image_path' => $filePath
                                ]);
                            }
                        }
                    
                        // Return a JSON response with all file paths
                        return response()->json(['filePaths' => $filePaths, 'message' => 'Files uploaded successfully', 'status_code' => 201], 201);
                    }
                
                
                $data = [
                        'property_id' => $property->id,
                        'user_id' => $id,
                        'property_title' => $propertyTitle,
                        'property_request' => $propertyRequest,
                        'property_category' => $category,
                        'price' => $price,
                        'distress_deal' => $distressSale,
                    ];

            return response()->json(['status'=>'success', 'status_code' => 201, 'property_id' => $property->id, 'data' => $data]);
        }
        else{
            return response()->json(['status'=> 'failed', 'status_code' => 401, 'message' => 'Something went wrong please try again']);
        }

}

// retrieve single property data
public function viewProperty($id){
    $property = Property::find($id);
    $images = DB::table('property_images')->where('property_id', $id)->get();
    $propertyFeatures = PropertyFeatures::where('property_id', $id)->get();
    
// get the property features that has the value of 1
$columns = [];
foreach ($propertyFeatures as $features) {
    foreach ($features->getAttributes() as $key => $value) {
        if ($value == 1 && $key !== 'id' && !in_array($key, ['incrementing', 'exists', 'timestamps'])) {
            $columnName = str_replace('_', ' ', $key); // replace the underscore of property features name with space
            $columns[] = ucwords($columnName);
        }
    }
}

    
    return response()->json(['status' => 'success', 'status_code' => 200, 'data' => $property, 'images' => $images, 'propertyFeatures' => $columns]);
}

// upload profile picture
public function UploadProfilePicture(Request $request){
   $id = Auth::user()->id;
   $fileName = '';
    $filePath = '';
    if($request->hasFile('profileImage')){
        $userFolder = public_path('user_ids');
        if (!file_exists($userFolder)) {
            mkdir($userFolder, 0777, true);
        }
        
        if(is_dir("$userFolder/profile_photo")){
            mkdir("$userFolder/profile_photo");
        }
        
        $uploadFolder = public_path("$userFolder/profile_photo");
        $file = $request->file('profileImage');
        $originalFileName = $file->getClientOriginalName(); 
        $extension = $file->getClientOriginalExtension();
        $fileName = time() . '.' . $extension; // Generate a unique file name
        $filePath = $file->move($userFolder, $fileName);
        
        $url = $filePath;
        $parsedUrl = parse_url($url);
        $basePath = "/home/imba/";
        $filteredPath = "https://".str_replace($basePath, "", $parsedUrl['path']);
        
        $user = new User;
        $user->exists = true;
        $user->id = $id;
        $user->profile_file = $fileName;
        $user->profile_path = $filteredPath;
        
        
        $image = User::where('id', Auth::user()->id)->value('profile_path');
        
        
        
        
        if($user->save()){
            return response()->json(['status_code' => 201, 'image' => $filteredPath]);
        }
        else{
            return response()->json(['status_code' => 501, 'message' => 'Something went wrong, please try again']);
        }
    }
    else{
       return response()->json(['status_code' => 501, 'message' => 'Something went wrong, please try again']);
    }
}

/* get properties */
public function GetProperties(){
    $properties = Property::get();
    
    foreach($properties as $property){
        $property->property_images = DB::table('property_images')->where('property_id', $property->id)->get()->toArray();
        $property->avatar = User::where('id', $property->user_id)->value('profile_path');
    }
    
    return $properties;
}


}




/*

impaAX5S#k$lK!3Jbano
*/