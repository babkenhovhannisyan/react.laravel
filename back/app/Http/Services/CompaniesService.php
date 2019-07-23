<?php 
namespace App\Http\Services;

use Illuminate\Http\Request;
use App\Models\Company;
use App\Http\Requests\CompaniesValidate;
use App\Http\Services\Companies;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Storage;

class CompaniesService
{


// Index function is for showing all data of companies inside database

public static function Index()
{
  $companies = Company::all();
  $basePath = url('/storage/logos');
  return response()->json([$companies,$basePath]);
}



// Store function accpets request  validates given data after successfully validating will add it in the table and will returns success status 204 with empty body

public static function Store($request)
{

    if($request->hasFile('file')){

          $filenameWithExt= $request->file('file')->getClientOriginalName();
          $filename = pathinfo($filenameWithExt,PATHINFO_FILENAME);
          $extension = $request->file('file')->getClientOriginalExtension();
          $fileNameToStore = $filename.'_'.time().'.'.$extension;
          $path = $request->file('file')->storeAs('public/logos',$fileNameToStore);
          }

          $company = new Company;
          $company->name= $request->get('name');
          $company->email= $request->get('email');
          $company->logo = $fileNameToStore;
          $company->website= $request->get('website');
          $company->save();       
      
      return response()->json(null, 204); 	
 }


// Update function accepts id of company that needs to be updated and  updates the exsisting company and returns  success status 204 with empty body

public static function Update($request, $id)
{         
     if($request->hasFile('file')){
      $filenameWithExt= $request->file('file')->getClientOriginalName();
      $filename = pathinfo($filenameWithExt,PATHINFO_FILENAME);
      $extension = $request->file('file')->getClientOriginalExtension();
      $fileNameToStore = $filename.'_'.time().'.'.$extension;
      $path = $request->file('file')->storeAs('public/logos',$fileNameToStore);
      $imageName = Company::select('logo')->where('id', $id)->pluck('logo')->toArray()[0];
            Storage::delete('public/logos/'.$imageName);    
     }
            $company = Company::find($id);
            $company->name = request('name');
            $company->email = request('email');
            $company->logo = $fileNameToStore;
            $company->website = request('website');
            $company->save();
            
           return response()->json(null, 204);                    
 }


// Show function accepts id of company,finds it in the table and returns founded company

public static function Show($id)
{
    $company = Company::findorFail($id);
    return response()->json($company);
}


// Destroy function accepts id of company and deletes it  

public static function Destroy($id)
{
 $company = Company::find($id);
 $imageName = $company->value('logo');

 $company->delete();
 
 Storage::delete('public/logos/'.$imageName);
 
  return response()->json(null, 204); 
 }
}