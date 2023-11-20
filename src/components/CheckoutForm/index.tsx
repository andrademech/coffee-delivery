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
    label: 'Crédito',
    icon: (
      <CreditCard
        size={22}
        className="rounded text-purple-700 dark:text-purple-950"
      />
    ),
  },
  {
    id: 'debit-card',
    label: 'Débito',
    icon: (
      <Bank
        size={22}
        className="rounded text-purple-700 dark:text-purple-950"
      />
    ),
  },
  {
    id: 'pix',
    label: 'Pix',
    icon: (
      <Money
        size={22}
        className="rounded text-purple-700 dark:text-purple-950"
      />
    ),
  },
]

export default function CheckoutForm() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext()

  return (
    <div className="flex w-full max-w-[30rem] flex-col">
      <div className="flex flex-col rounded bg-[#F3F2F2] px-6 py-4 dark:bg-zinc-800 dark:text-zinc-400 md:p-10">
        <div className="flex items-start justify-center gap-2">
          <MapPinLine
            size={22}
            className="rounded text-purple-500 dark:text-purple-200"
          />
          <div className="flex w-full flex-col items-center">
            <h2 className="w-full text-left text-base dark:text-purple-100">
              Endereço de Entrega
            </h2>
            <span className="w-full text-left text-sm font-light dark:text-purple-100">
              Insira o endereço onde deseja receber seu pedido
            </span>
          </div>
        </div>
        <div className="mt-8 flex flex-col gap-4">
          {inputData.map(({ id, placeholder }) => (
            <>
              <input
                key={id}
                type="text"
                id={id}
                placeholder={placeholder}
                {...register(id)}
                className="h-8 w-full rounded border border-zinc-300 px-4 placeholder:text-zinc-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-500 dark:border-zinc-600 dark:bg-zinc-600 dark:text-zinc-900 dark:placeholder:text-zinc-300 dark:focus:ring-purple-800"
              />
              {errors[id] && (
                <span className="text-red-500">{errors[id].message}</span>
              )}
            </>
          ))}
        </div>
      </div>

      <div className="dark:bg-zinc mt-4 flex w-full flex-col rounded bg-[#F3F2F2] px-2 py-4 dark:bg-zinc-600 md:p-10">
        <div className="flex w-full items-start justify-center gap-2">
          <CurrencyDollar
            size={22}
            className="rounded text-purple-500 dark:text-purple-100"
          />
          <div className="flex w-full flex-col items-center">
            <h2 className="w-full text-left text-base dark:text-purple-100">
              Pagamento
            </h2>
            <span className="w-full text-left text-sm font-light dark:text-purple-100">
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
                  className="flex w-full flex-col justify-between gap-1 xs:flex-row md:gap-4"
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  {radioGroupData.map((radio) => (
                    <RadioGroup.Item
                      key={radio.id}
                      value={radio.id}
                      className="mx-auto flex h-8 min-w-[80%] items-center justify-between gap-4 rounded px-12 py-5 font-bold transition-colors hover:bg-purple-200 data-[state=checked]:bg-purple-300 dark:text-purple-950 dark:hover:bg-purple-200 dark:data-[state=checked]:bg-purple-300 dark:data-[state=checked]:text-purple-950 xs:min-w-[7rem] xs:justify-center xs:p-0"
                      {...register(radio.id)}
                    >
                      <span className="text-sm">{radio.label}</span>
                      {radio.icon}
                    </RadioGroup.Item>
                  ))}
                </RadioGroup.Root>
              )
            }}
          />
        </div>
      </div>
    </div>
  )
}
