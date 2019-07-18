<?php 

namespace App\Http\Services;


use Illuminate\Http\Request;
use App\Models\Company;
use App\Http\Requests\CompaniesValidate;
use App\Http\Services\Companies;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Storage;

class Companies{


public static function Store($request){

  
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

          
      
      return response()->json('Created');
 	
 }


public static function Update($request, $id){

         
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
            
           return response()->json('Created');
                      
 }
 






}