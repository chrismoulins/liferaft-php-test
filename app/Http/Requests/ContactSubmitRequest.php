<?php

namespace App\Http\Requests;

use App\Http\Requests\Api\FormRequest;

class ContactSubmitRequest extends FormRequest
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
            'name' => 'required|string',
            'email' => 'required|email',
            'phoneNumber' => 'required|string',
            'address.houseNumber' => 'required|integer',
            'address.streetName' => 'required|string',
            'address.city' => 'required|string',
            'address.stateProvince' => 'required|string',
            'address.country' => 'required|string',
        ];
    }

    public function messages()
    {
        return [];
    }
}
