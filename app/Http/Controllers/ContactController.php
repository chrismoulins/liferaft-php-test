<?php

namespace App\Http\Controllers;

use App\Http\Requests\ContactSubmitRequest;

class ContactController extends Controller
{
    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\ContactSubmitRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function submit(ContactSubmitRequest $request)
    {
        appendToJsonFile('customers.txt', $request->all());
        return response()->json(['success' => 'true']);
    }
}
