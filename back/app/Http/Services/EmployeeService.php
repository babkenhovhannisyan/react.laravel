<?php 
namespace App\Http\Services;

use Illuminate\Http\Request;
use App\Http\Requests\EmployeesValidate;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Storage;
use App\Models\Employee;

class EmployeeService
{


// Index function uses for retreiving all data of employees from database

public static function Index()
{   
    $employees = Employee::all();
    return response()->json($employees);
}




// Store function validates given data after successfully validating will add it in the table

public static function Store($request)
{
         $employer = new Employee;
         $employer->firstname= $request->get('firstname');
         $employer->lastname= $request->get('lastname');
         $employer->company_id= $request->get('company_id');
         $employer->email = $request->get('email');
         $employer->phone = $request->get('phone');
         $employer->save();
      
      return response()->json(null, 204); 	
 }



// Update function updates the exsisting employee with specified id 

public static function Update($request, $id)
{
   $employer = Employee::find($id);
   $employer->firstname = request('firstname');
   $employer->lastname = request('lastname');
   $employer->email = request('email');
   $employer->phone = request('phone');
   $employer->save();

   return response()->json(null, 204);           
 }


// Show function is for displaying inputs inside data


 public static function Show($id)
 {
  $employer = Employee::findorFail($id);
  return response()->json($employer);
 }



// Destroy function accepts id of employee and deletes it  

 public static function Destroy($id)
 {
    Employee::destroy($id);
    return response()->json(null, 204);
 }
 
}