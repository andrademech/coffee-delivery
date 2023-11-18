import { Link, useNavigate } from 'react-router-dom'
import CheckoutForm from '../../components/CheckoutForm'
import { SelectedCoffees } from '../../components/SelectedCoffees'
import { useQuantity } from '../../hooks/useQuantity'
import coffeeDeliveryLogo from '../../assets/coffee_delivery_logo.svg'
import * as zod from 'zod'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const newCheckoutFormValidationSchema = zod.object({
  cep: zod.string().nonempty(),
  address: zod.string().nonempty(),
  number: zod.string().nonempty(),
  complement: zod.string().optional(),
  district: zod.string().nonempty(),
  city: zod.string().nonempty(),
  state: zod.string().nonempty(),
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

  function handleNewCheckoutFormSubmit(data: NewCheckoutFormData) {
    console.log(`Here is your data: ${JSON.stringify(data, null, 2)}`)

    console.log(`
    You selected ${totalCartQuantity} coffee(s) and your total is ${totalCartQuantity}
    `)

    // Sending to success route
    navigate('/success')
  }

  return (
    <div className="flex flex-col xl:flex-row gap-4 items-center xl:items-start mb-4">
      <form
        onSubmit={handleSubmit(handleNewCheckoutFormSubmit)}
        className="flex flex-col items-center gap-4 mx-auto"
      >
        {totalCartQuantity > 0 ? (
          <FormProvider {...newCheckoutForm}>
            <CheckoutForm />
            <SelectedCoffees />
          </FormProvider>
        ) : (
          <div className="flex flex-col items-center justify-center gap-4 bg-purple-100 p-8 rounded w-full">
            <h3 className="text-lg">Nenhum café selecionado</h3>
            <p className="text-sm text-center">
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
    </div>
  )
}
