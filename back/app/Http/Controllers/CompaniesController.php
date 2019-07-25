<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\CompanyRequest;
use Illuminate\Support\Facades\Storage;
use App\Models\Company;
use App\Services\CompaniesService;

class CompaniesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json(CompaniesService::getAll());
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CompanyRequest $request)
    {
        CompaniesService::storeData($request->all());
        return response()->json(null, 204);
    }

    /**
     * Display the specified company resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return CompaniesService::getCompany($id);
    }

    /**
     * Update the specified company in the storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response with success 204 code
     */
    public function update(CompanyRequest $request, $id)
    {
        CompaniesService::updatePost($request->all(), $id);
        return response()->json(null, 204);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        CompaniesService::delete($id);
        return response()->json(null, 204);
    }
}
