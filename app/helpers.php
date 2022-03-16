<?php

use Illuminate\Support\Facades\Storage;

if (! function_exists('appendToJsonFile')) 
{
    function appendToJsonFile($filename, $new_data)
    {
        if (Storage::exists($filename)) {
            $existing_file = Storage::get($filename);
            $json = json_decode($existing_file, true);
            array_push($json, $new_data);
            Storage::put($filename, json_encode($json));
        } else {
            Storage::put($filename, json_encode([$new_data]));
        }
    }
}