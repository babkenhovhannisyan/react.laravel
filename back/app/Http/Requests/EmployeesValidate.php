<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class EmployeesValidate extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
        'firstname' => 'required',
        'lastname' => 'required',
        'company_id'=>'required',
        'email'=>'email|nullable|unique:employees,email,'.$this->id,
        ];
    }
}