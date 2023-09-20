import {
  Bank,
  CreditCard,
  CurrencyDollar,
  MapPinLine,
  Money,
} from 'phosphor-react'

import * as RadioGroup from '@radix-ui/react-radio-group'

import { Controller, useFormContext } from 'react-hook-form'

const inputData = [
  {
    id: 'cep',
    placeholder: 'CEP',
  },
  {
    id: 'address',
    placeholder: 'Endereço',
  },
  {
    id: 'number',
    placeholder: 'Número',
  },
  {
    id: 'complement',
    placeholder: 'Complemento',
  },
  {
    id: 'district',
    placeholder: 'Bairro',
  },
  {
    id: 'city',
    placeholder: 'Cidade',
  },
  {
    id: 'state',
    placeholder: 'UF',
  },
]

const radioGroupData = [
  {
    id: 'credit-card',
    label: 'Cartão de Crédito',
    icon: <CreditCard size={22} className="text-purple-700 rounded" />,
  },
  {
    id: 'debit-card',
    label: 'Cartão de Débito',
    icon: <Bank size={22} className="text-purple-700 rounded" />,
  },
  {
    id: 'pix',
    label: 'Pix',
    icon: <Money size={22} className="text-purple-700 rounded" />,
  },
]

export default function CheckoutForm() {
  const { register, control } = useFormContext()

  return (
    <>
      <div className="w-[40rem] flex flex-col p-10 bg-[#F3F2F2] rounded">
        <div className="flex w-full justify-center gap-2 items-start">
          <MapPinLine size={22} className="text-purple-500 rounded" />
          <div className="flex flex-col w-full items-center">
            <h2 className="text-left text-base w-full">Endereço de Entrega</h2>
            <span className="text-left font-light text-sm w-full">
              Insira o endereço onde deseja receber seu pedido
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-4 mt-8">
          {inputData.map((input) => (
            <input
              key={input.id}
              type="text"
              id={input.id}
              placeholder={input.placeholder}
              {...register(input.id)}
              className="w-full h-8 rounded px-4 border border-gray-300  focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          ))}
        </div>
      </div>
      <div className="w-[40rem] flex flex-col p-10 bg-[#F3F2F2] rounded">
        <div className="flex w-full justify-center gap-2 items-start">
          <CurrencyDollar size={22} className="text-purple-500 rounded" />
          <div className="flex flex-col w-full items-center">
            <h2 className="text-left text-base w-full">Pagamento</h2>
            <span className="text-left font-light text-sm w-full">
              O pagamento é feito na entrega. Escolha a forma que deseja pagar
            </span>
          </div>
        </div>
        <div className="flex gap-3 mt-8">
          <Controller
            name="transactionMethod"
            control={control}
            render={({ field }) => {
              return (
                <RadioGroup.Root
                  className="flex gap-4 w-full justify-between items-center"
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  {radioGroupData.map((radio) => (
                    <RadioGroup.Item
                      key={radio.id}
                      value={radio.id}
                      className="flex justify-center items-center px-4 min-w-[140px] h-8 gap-4 rounded data-[state=checked]:bg-purple-300 py-5 hover:bg-purple-200 transition-colors"
                      {...register(radio.id)}
                    >
                      {radio.icon}
                      <span className="text-sm">{radio.label}</span>
                    </RadioGroup.Item>
                  ))}
                </RadioGroup.Root>
              )
            }}
          />
        </div>
      </div>
    </>
  )
}
