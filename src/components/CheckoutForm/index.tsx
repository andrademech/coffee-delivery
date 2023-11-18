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
    icon: <CreditCard size={22} className="rounded text-purple-700" />,
  },
  {
    id: 'debit-card',
    label: 'Cartão de Débito',
    icon: <Bank size={22} className="rounded text-purple-700" />,
  },
  {
    id: 'pix',
    label: 'Pix',
    icon: <Money size={22} className="rounded text-purple-700" />,
  },
]

export default function CheckoutForm() {
  const { register, control } = useFormContext()

  return (
    <>
      <div className="flex w-[40rem] flex-col rounded bg-[#F3F2F2] p-10">
        <div className="flex w-full items-start justify-center gap-2">
          <MapPinLine size={22} className="rounded text-purple-500" />
          <div className="flex w-full flex-col items-center">
            <h2 className="w-full text-left text-base">Endereço de Entrega</h2>
            <span className="w-full text-left text-sm font-light">
              Insira o endereço onde deseja receber seu pedido
            </span>
          </div>
        </div>
        <div className="mt-8 flex flex-col gap-4">
          {inputData.map((input) => (
            <input
              key={input.id}
              type="text"
              id={input.id}
              placeholder={input.placeholder}
              {...register(input.id)}
              className="h-8 w-full rounded border border-zinc-300 px-4  focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          ))}
        </div>
      </div>
      <div className="flex w-[40rem] flex-col rounded bg-[#F3F2F2] p-10">
        <div className="flex w-full items-start justify-center gap-2">
          <CurrencyDollar size={22} className="rounded text-purple-500" />
          <div className="flex w-full flex-col items-center">
            <h2 className="w-full text-left text-base">Pagamento</h2>
            <span className="w-full text-left text-sm font-light">
              O pagamento é feito na entrega. Escolha a forma que deseja pagar
            </span>
          </div>
        </div>
        <div className="mt-8 flex gap-3">
          <Controller
            name="transactionMethod"
            control={control}
            render={({ field }) => {
              return (
                <RadioGroup.Root
                  className="flex w-full items-center justify-between gap-4"
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  {radioGroupData.map((radio) => (
                    <RadioGroup.Item
                      key={radio.id}
                      value={radio.id}
                      className="flex h-8 min-w-[140px] items-center justify-center gap-4 rounded px-4 py-5 transition-colors hover:bg-purple-200 data-[state=checked]:bg-purple-300"
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
