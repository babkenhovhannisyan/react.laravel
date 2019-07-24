<?php 
namespace App\Services;

use Illuminate\Http\Request;
use App\Http\Requests\EmployeesValidate;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Storage;
use App\Models\Employee;

class EmployeeService
{   

    /**
       * Display a listing of the resource.
       *
       * @return \Illuminate\Http\Response
  
    */

    public static function getAll()
    {   
        return Employee::all();
    }

    /**
     * Store a newly created employee in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */

    public static function storeData($data)
    {
             $employer = new Employee;
             $employer->firstname= $data['firstname'];
             $employer->lastname= $data['lastname'];
             $employer->company_id= $data['company_id'];
             $employer->email = $data['email'];
             $employer->phone = $data['phone'];
             $employer->save();	
     }


    /**
       * Updates the specified resource in storage.
       *
       * @param  \Illuminate\Http\Request  $request->all()
       * @param  int  $id
       * @return \Illuminate\Http\Response
    */

    public static function updatePost($data, $id)
    {
       $employer = Employee::find($id);
       $employer->firstname = $data['firstname'];
       $employer->lastname = $data['lastname'];
       $employer->email = $data['email'];
       $employer->phone = $data['phone'];
       $employer->save();              
     }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
    */
    
    public static function getEmployee($id)
    {
       return Employee::find($id);
    }

    /**
     * Remove the specified employee from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
    */

    public static function Destroy($id)
    {
       Employee::destroy($id);
    }
 
}