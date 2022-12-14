<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    use SoftDeletes;
    use HasApiTokens;
    use HasFactory;
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role_id',
        'created_by'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }

    public function role()
    {
        return $this->belongsTo(Role::class);
    }


    // public function authorizeRoles($roles)
    // {
    //   if ($this->hasAnyRole($roles)) {
    //     return true;
    //   }
    //   abort(401, 'This action is unauthorized.');
    // }

    // public function hasAnyRole($roles)
    // {
    //   if (is_array($roles)) {
    //     foreach ($roles as $role) {
    //       if ($this->hasRole($role)) {
    //         return true;
    //       }
    //     }
    //   } else {
    //     if ($this->hasRole($roles)) {
    //       return true;
    //     }
    //   }
    //   return false;
    // }

    public function hasRole($role)
    {
        if ($this->role()->where('name', $role)->first()) {
            return true;
        }
        return false;
    }

    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

     public function getCreatedAtAttribute($value)
     {
         return Carbon::parse($value)->format('d/m/Y h:m A');
     }

       public function getUpdatedAtAttribute($value)
       {
           return Carbon::parse($value)->format('d/m/Y h:m A');
       }
}
