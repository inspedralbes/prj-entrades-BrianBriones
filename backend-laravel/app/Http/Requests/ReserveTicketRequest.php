<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ReserveTicketRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'ticket_type_id' => ['required', 'integer', 'exists:ticket_types,id'],
            'quantity'       => ['required', 'integer', 'min:1'],
            'match_id'       => ['nullable', 'integer'] // Aceptamos el match_id que enviemos desde front
        ];
    }
    
    /**
     * Get custom messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'ticket_type_id.required' => 'El tipo de entrada es obligatorio.',
            'ticket_type_id.exists'   => 'El tipo de entrada seleccionado no es válido.',
            'quantity.required'       => 'Debe especificar la cantidad de entradas.',
            'quantity.min'            => 'La cantidad debe ser al menos 1.',
        ];
    }
}
