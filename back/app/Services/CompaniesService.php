<?php
namespace App\Services;

use Illuminate\Http\Request;
use App\Models\Company;
use App\Http\Requests\CompaniesValidate;
use App\Http\Services\Companies;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Storage;

class CompaniesService
{
    
    /**
       * Getting full path of company image.
       *
       * @return \Illuminate\Http\Response

     */
     


    public static function getLogoPath($company)
    {
        $fullPath = url('/storage/logos');
        return  $fullPath . '/' . $company->logo ;
    }

     
    /**
      * Display a listing of the resource.
      *
      * @return \Illuminate\Http\Response

    */

    public static function getAll()
    {
        $companies = Company::all();
        foreach ($companies as $company) {
            $company->logo = CompaniesService::getLogoPath($company);
        }
        
        return $companies;
    }

    /**
    * Store a newly created resource in storage.
    *
    * @param  \Illuminate\Http\Request  $request
    * @return \Illuminate\Http\Response
    */


    public static function storeData($data)
    {
        if (isset($data['file'])) {
            $filenameWithExt= $data['file']->getClientOriginalName();
            $filename = pathinfo($filenameWithExt, PATHINFO_FILENAME);
            $extension = $data['file']->getClientOriginalExtension();
            $fileNameToStore = $filename.'_'.time().'.'.$extension;
            $path = $data['file']->storeAs('public/logos', $fileNameToStore);
        }

        $company = new Company;
        $company->name  = $data['name'];
        $company->email = $data['email'];
        $company->logo  = $fileNameToStore;
        $company->website = $data['website'];
        $company->save();
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
        if (isset($data['file'])) {
            $filenameWithExt= $data['file']->getClientOriginalName();
            $filename = pathinfo($filenameWithExt, PATHINFO_FILENAME);
            $extension = $data['file']->getClientOriginalExtension();
            $fileNameToStore = $filename.'_'.time().'.'.$extension;
            $path = $data['file']->storeAs('public/logos', $fileNameToStore);
            $imageName = Company::select('logo')->where('id', $id)->pluck('logo')->toArray()[0];
            Storage::delete('public/logos/'.$imageName);
        }
        $company = Company::find($id);
        $company->name  = $data['name'];
        $company->email = $data['email'];
        $company->logo  = $fileNameToStore;
        $company->website = $data['website'];
        $company->save();
    }


    /**
        * Display the specified company with specified id.
        *
        * @param  int  $id
        * @return \Illuminate\Http\Response
    */

    public static function getCompany($id)
    {
        return Company::find($id);
    }

    /**
    * Remove the specified company from storage.
    *
    * @param  int  $id
    * @return \Illuminate\Http\Response
    */

    public static function delete($id)
    {
        $company = Company::find($id);
        $imageName = $company->value('logo');
        $company->delete();
        Storage::delete('public/logos/'.$imageName);
    }
}
