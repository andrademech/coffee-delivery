import { Link, useNavigate } from 'react-router-dom'
import CheckoutForm from '../../components/CheckoutForm'
import { SelectedCoffees } from '../../components/SelectedCoffees'
import { useQuantity } from '../../hooks/useQuantity'
import coffeeDeliveryLogo from '../../assets/coffee_delivery_logo.svg'
import * as zod from 'zod'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useContextSelector } from 'use-context-selector'
import { CartContext } from '../../contexts/CartContext'

const newCheckoutFormValidationSchema = zod.object({
  cep: zod.string().nonempty('CEP é obrigatório'),
  address: zod.string().nonempty('Endereço é obrigatório'),
  number: zod.string().nonempty('Número é obrigatório'),
  complement: zod.string().optional(),
  district: zod.string().nonempty('Bairro é obrigatório'),
  city: zod.string().nonempty('Cidade é obrigatório'),
  state: zod.string().nonempty('UF é obrigatório'),
  transactionMethod: zod.enum(['credit-card', 'debit-card', 'pix']),
})

// Types inference
export type NewCheckoutFormData = zod.infer<
  typeof newCheckoutFormValidationSchema
>

export function Checkout() {
  const { totalCartQuantity } = useQuantity()

  const navigate = useNavigate()

  const newCheckoutForm = useForm<NewCheckoutFormData>({
    resolver: zodResolver(newCheckoutFormValidationSchema),
    defaultValues: {
      cep: '',
      address: '',
      number: '',
      complement: '',
      district: '',
      city: '',
      state: '',
      transactionMethod: 'credit-card',
    },
  })

  const { handleSubmit } = newCheckoutForm

  const { createOrder } = useContextSelector(CartContext, (context) => ({
    createOrder: context.createOrder,
  }))

  function handleNewCheckoutFormSubmit(data: NewCheckoutFormData) {
    console.log(`Here is your data: ${JSON.stringify(data, null, 2)}`)

    console.log(`
    You selected ${totalCartQuantity} coffee(s) and your total is ${totalCartQuantity}
    `)

    // Create new order
    createOrder({
      order: {
        id: Math.floor(Math.random() * 1000),
        cep: data.cep,
        address: data.address,
        number: data.number,
        complement: data.complement,
        district: data.district,
        city: data.city,
        state: data.state,
        transactionMethod: data.transactionMethod,
      },
    })

    // Sending to success route
    navigate('/success')
  }

  return (
    <form
      onSubmit={handleSubmit(handleNewCheckoutFormSubmit)}
      className="flex flex-col items-center justify-center gap-4 lg:flex-row lg:items-start"
    >
      {totalCartQuantity > 0 ? (
        <FormProvider {...newCheckoutForm}>
          <CheckoutForm />
          <SelectedCoffees />
        </FormProvider>
      ) : (
        <div className="flex w-full flex-col items-center justify-center gap-4 rounded bg-purple-100 p-8">
          <h3 className="text-lg">Nenhum café selecionado</h3>
          <p className="text-center text-sm">
            Retorne para selecionar um café e finalizar seu pedido
          </p>
          <Link to="/">
            <img
              src={coffeeDeliveryLogo}
              width={80}
              alt="Coffee Delivery Logo"
            />
          </Link>
        </div>
      )}
    </form>
  )
}
