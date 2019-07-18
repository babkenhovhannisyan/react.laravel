<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\EmployeesValidate;
use App\Models\Employer;

class EmployeesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $employees = Employer::all();
        return response()->json($employees);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(EmployeesValidate $request)
    {
         $employer = new Employer;
         $employer->firstname= $request->get('firstname');
         $employer->lastname= $request->get('lastname');
         $employer->company_id= $request->get('company_id');
         $employer->email = $request->get('email');
         $employer->phone = $request->get('phone');
         $employer->save();
      
      return response()->json('Created');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $employer = Employer::findorFail($id);
    
        return response()->json($employer);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(EmployeesValidate $request, $id)
    {
            $employer = Employer::find($id);
            $employer->firstname = request('firstname');
            $employer->lastname = request('lastname');
            // $company->company_id = request('company_id');
            $employer->email = request('email');
            $employer->phone = request('phone');
            $employer->save();
            
           return response()->json('Created');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        return Employer::destroy($id);
    }
}
