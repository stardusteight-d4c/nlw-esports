import * as Dialog from '@radix-ui/react-dialog'
import { Check, GameController } from 'phosphor-react'
import Input from './integrate/Input'
import * as Checkbox from '@radix-ui/react-checkbox'
import * as ToggleGroup from '@radix-ui/react-toggle-group'
import { useEffect, useState, FormEvent } from 'react'
import { DialogPortal } from './integrate/DialogPortal'

interface Props {
  games: Game[]
}

export const CreateAdModal = ({ games }: Props) => {
  const [weekDays, setWeekDays] = useState<string[]>([])
  const [useVoiceChannel, setUseVoiceChannel] = useState(false)

  if (!games) {
    return <></>
  }

  async function handleCreateAd(event: FormEvent) {
    event.preventDefault()

    const formData = new FormData(event.target as HTMLFormElement)
    const data = Object.fromEntries(formData)

    // fazer validação, autenticação, reponsividade e ajustes no layout
    if (!data.name) {
      return
    }

    try {
      // await axios.post(`http://localhost:3333/games/${data.game}/ads`, {
      //   name: data.name,
      //   yearsPlaying: Number(data.yearsPlaying),
      //   discord: data.discord,
      //   weekDays: weekDays.map(Number),
      //   hourStart: data.hourStart,
      //   hourEnd: data.hourEnd,
      //   useVoiceChannel: useVoiceChannel,
      // })

      alert('Anúncio criado com sucesso!')
    } catch (error) {
      alert('Erro ao criar o anúncio!')
      console.error(error)
    }
  }

  return (
    <DialogPortal title='Publique um anúncio'>
      <form onSubmit={handleCreateAd} className='mt-4 flex flex-col gap-4'>
        <div className='flex flex-col gap-2'>
          <label htmlFor='game' className='font-semibold'>
            Qual o game?
          </label>
          <select
            id='game'
            name='game'
            defaultValue=''
            className='bg-zinc-900 appearance-none placeholder:text-zinc-500 focus:outline-none focus:ring focus:ring-violet-600 py-3 px-4 rounded text-sm'
          >
            <option disabled value=''>
              Selecione o game que deseja jogar
            </option>
            {games.map((game) => {
              return (
                <option key={game.id} value={game.id}>
                  {game.title}
                </option>
              )
            })}
          </select>
        </div>
        <div className='flex flex-col gap-2'>
          <label htmlFor='name' className='font-semibold'>
            Seu nome (ou nickname)
          </label>
          <Input
            id='name'
            name='name'
            placeholder='Como te chamam dentro do game?'
          />
        </div>
        <div className='grid grid-cols-2 gap-6'>
          <div className='flex flex-col gap-2'>
            <label htmlFor='yearsPlaying'>Joga há quantos anos?</label>
            <Input
              name='yearsPlaying'
              id='yearsPlaying'
              type='number'
              placeholder='Tudo bem ser ZERO'
            />
          </div>
          <div className='flex flex-col gap-2'>
            <label htmlFor='discord'>Qual seu Discord?</label>
            <Input name='discord' id='discord' placeholder='Usuario#0000' />
          </div>
        </div>
        <div className='flex gap-6'>
          <div className='flex flex-col gap-2'>
            <label htmlFor='weekDays'>Quando costuma jogar?</label>
            <ToggleGroup.Root
              type='multiple'
              className='w-[180px] gap-2 gap-x-4 flex flex-wrap'
              value={weekDays}
              onValueChange={setWeekDays}
            >
              <ToggleGroup.Item
                value='0'
                title='Domingo'
                className={`w-8 h-8 rounded ${
                  weekDays.includes('0') ? 'bg-violet-500' : 'bg-zinc-900'
                }`}
              >
                D
              </ToggleGroup.Item>
              <ToggleGroup.Item
                value='1'
                title='Segunda'
                className={`w-8 h-8 rounded ${
                  weekDays.includes('1') ? 'bg-violet-500' : 'bg-zinc-900'
                }`}
              >
                S
              </ToggleGroup.Item>
              <ToggleGroup.Item
                value='2'
                title='Terça'
                className={`w-8 h-8 rounded ${
                  weekDays.includes('2') ? 'bg-violet-500' : 'bg-zinc-900'
                }`}
              >
                T
              </ToggleGroup.Item>
              <ToggleGroup.Item
                value='3'
                title='Quarta'
                className={`w-8 h-8 rounded ${
                  weekDays.includes('3') ? 'bg-violet-500' : 'bg-zinc-900'
                }`}
              >
                Q
              </ToggleGroup.Item>
              <ToggleGroup.Item
                value='4'
                title='Quinta'
                className={`w-8 h-8 rounded ${
                  weekDays.includes('4') ? 'bg-violet-500' : 'bg-zinc-900'
                }`}
              >
                Q
              </ToggleGroup.Item>
              <ToggleGroup.Item
                value='5'
                title='Sexta'
                className={`w-8 h-8 rounded ${
                  weekDays.includes('5') ? 'bg-violet-500' : 'bg-zinc-900'
                }`}
              >
                S
              </ToggleGroup.Item>
              <ToggleGroup.Item
                value='6'
                title='Sábado'
                className={`w-8 h-8 rounded ${
                  weekDays.includes('6') ? 'bg-violet-500' : 'bg-zinc-900'
                }`}
              >
                S
              </ToggleGroup.Item>
            </ToggleGroup.Root>
          </div>
          <div className='flex flex-col gap-2 flex-1'>
            <label htmlFor='hourStart'>Qual horário do dia?</label>
            <div className='grid grid-cols-2 gap-2'>
              <Input
                name='hourStart'
                id='hourStart'
                type='time'
                placeholder='De'
              />
              <Input
                name='hourEnd'
                id='hourEnd'
                type='time'
                placeholder='Até'
              />
            </div>
          </div>
        </div>
        <label className='mt-2 flex items-center gap-2 text-sm'>
          <Checkbox.Root
            onCheckedChange={() => setUseVoiceChannel(!useVoiceChannel)}
            className='w-6 h-6 p-1 rounded bg-zinc-900'
          >
            <Checkbox.Indicator>
              <Check className='w-4 h-4 font-bold text-emerald-400' />
            </Checkbox.Indicator>
          </Checkbox.Root>
          Costumo me conectar ao chat de voz
        </label>

        <footer className='mt-4 absolute bottom-[32px] right-[40px] flex justify-end gap-4'>
          <Dialog.Close
            type='button'
            className='bg-zinc-500 transition-all duration-200 hover:bg-zinc-600 px-5 h-12 rounded-md font-semibold'
          >
            Cancelar
          </Dialog.Close>
          <button
            type='submit'
            className='bg-violet-500 transition-all duration-200 hover:bg-violet-600 px-5 h-12 rounded-md font-semibold flex items-center gap-3'
          >
            <GameController size={24} /> Encontrar duo
          </button>
        </footer>
      </form>
    </DialogPortal>
  )
}