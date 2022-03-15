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
            'phone' => 'required|string',
            'houseNumber' => 'required|integer',
            'streetName' => 'required|string',
            'city' => 'required|string',
            'country' => 'required|string',
        ];
    }

    public function messages()
    {
        return [];
    }
}
