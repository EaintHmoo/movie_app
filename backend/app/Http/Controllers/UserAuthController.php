<?php

namespace App\Http\Controllers;

use App\Helper\FileUpload;
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\HttpFoundation\Response;

class UserAuthController extends Controller
{
    public function register(Request $request)
    {
        $registerUserData = $request->validate([
            'name' => 'required|string',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|min:8'
        ]);
        $user = User::create([
            'name' => $registerUserData['name'],
            'email' => $registerUserData['email'],
            'password' => Hash::make($registerUserData['password']),
        ]);

        $user->roles()->sync(2);

        return response()
            ->json([
                'message' => 'Register Successfully! wait to be approved by admin',
                'status' => Response::HTTP_CREATED
            ]);
    }

    public function login(Request $request)
    {
        $loginUserData = $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|min:8'
        ]);
        $user = User::where('email', $loginUserData['email'])->first();
        if (!$user || !Hash::check($loginUserData['password'], $user->password)) {
            return response()->json([
                'message' => 'Email or password wrong!!',
                'status' => Response::HTTP_UNAUTHORIZED,
            ], Response::HTTP_UNAUTHORIZED);
        }
        if ($user->approved !== 1) {
            return response()->json([
                'message' => 'Please wait admin approve.',
                'status' => Response::HTTP_UNAUTHORIZED,
            ], Response::HTTP_UNAUTHORIZED);
        }
        $token = $user->createToken($user->id . $user->name . '-AuthToken')->plainTextToken;
        return response()->json([
            'access_token' => $token,
            'data' => new UserResource($user),
            'status' => Response::HTTP_ACCEPTED
        ]);
    }

    public function logout()
    {
        auth()->user()->tokens()->delete();

        return response()->json([
            "message" => "logged out successfully",
            "status" => Response::HTTP_OK
        ]);
    }

    public function index()
    {
        $users = User::with('roles')->get();
        return response()->json([
            'data' => UserResource::collection($users),
            'status' => Response::HTTP_OK,
        ]);
    }

    public function approve(User $user)
    {
        $user->update([
            'approved' => 1
        ]);

        return response()->json([
            'message' => 'User approved successfully',
            'status' => Response::HTTP_OK
        ]);
    }

    public function changePassword(Request $request)
    {
        $requestData = $request->validate([
            'newPassword' => 'required|min:8',
            'prePassword' => 'required|min:8',
        ]);
        $user = auth()->user();
        if (Hash::check($requestData['prePassword'], $user->password)) {
            auth()->user()->update([
                'password' => Hash::make($requestData['newPassword']),
            ]);
            return response()
                ->json([
                    'message' => 'Change password successfully',
                    'status' => Response::HTTP_OK
                ], Response::HTTP_OK);
        } else {
            return response()
                ->json([
                    'errors' => [
                        'prePassword' => 'Pre password is wrong',
                    ],
                    'status' => 500
                ], 500);
        }
    }

    public function updateProfile(Request $request)
    {
        try {
            if ($request->file('image', false)) {

                FileUpload::delete(auth()->user()->image);

                $file_url = FileUpload::upload('avatar', $request->image);

                auth()->user()->update([
                    'name' => $request->name,
                    'email' => $request->email,
                    'image' => $file_url,
                ]);
            } else {
                auth()->user()->update([
                    'name' => $request->name,
                    'email' => $request->email
                ]);
            }

            return response()
                ->json([
                    'message' => 'Profile updated successfully',
                    'user' => new UserResource(auth()->user()),
                    'status' => Response::HTTP_OK
                ], Response::HTTP_OK);
        } catch (\Exception $e) {
            return response()
                ->json([
                    'message' => 'Fail to updata',
                    'status' => 500
                ], 500);
        }
    }

    public function  deleteAccount()
    {
        auth()->user()->delete();
        return response()
            ->json([
                'message' => 'Account deleted successfully',
                'status' => Response::HTTP_OK
            ], Response::HTTP_OK);
    }

    public function  destory(User $user)
    {
        $user->delete();
        return response()
            ->json([
                'message' => 'User deleted successfully',
                'status' => Response::HTTP_OK
            ], Response::HTTP_OK);
    }
}
