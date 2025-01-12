import { forwardRef, useCallback, useImperativeHandle, useRef, useState } from "react"
import Day from "./day";
import styles from './reserve.module.css'

export type ReserveProps = {
  onSubmit?: () => void
}

const ReserveInner = ({onSubmit}: ReserveProps, outerRef: React.ForwardedRef<Partial<(HTMLDialogElement & {closeReserve?: ()=>void, showReserve?: (data: {date: Date, events: { title: string; start: string; end: string;}[]})=>void}) | null>>) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  
  const showReserve = useCallback(({date, events}: {date: Date, events: { title: string; start: string; end: string;}[]})=>{
    setEvents(events)
    setDate(date)
    dialogRef.current?.showModal()
  }, [])
  const closeReserve = useCallback(()=>{dialogRef.current?.close()}, [])

  useImperativeHandle(outerRef, () => {
    const result = dialogRef.current ? Object.assign(dialogRef.current, { closeReserve, showReserve }) : {}
    return result
  })  

  const [date, setDate] = useState<Date>(new Date())
  const [events, setEvents] = useState<{ title: string; start: string; end: string;}[]>([])

  const [horaMin, setHoraMin] = useState<number>()
  const [horaMax, setHoraMax] = useState<number>()
  return (
    <dialog ref={dialogRef}>
      <form method="dialog" onSubmit={onSubmit} onReset={closeReserve}>
        <section style={{display: 'grid', gridTemplateColumns: '2fr 3fr'}}>
          <Day onClick={()=>console.log('day click')} events={events} date={date} />
          <div className={styles['reserve-form']} style={{display: 'flex', flexFlow: 'column'}}>
            <label className=""> Nombre
              <input name="nombre" />
            </label>
            <label> Apellidos
              <input name="apellidos" />
            </label>
            <label> Email
              <input name="email" />
            </label>
            <label> Teléfono
              <input name="telefono" />
            </label>
            <div style={{display: 'flex', width: '100%', gap: 16}}>
              
              <label style={{flexGrow: 1}}> Hora de inicio
                <select name="hora-inicio" value={horaMin} onChange={(e)=>{
                  setHoraMin(+e.target.value)
                  setHoraMax(+e.target.value+1)
                }}>
                  {Array.from({length:14}, (_, hour)=> hour + 10).map(hour =>
                    <option 
                      key={hour} 
                      value={hour} 
                      disabled={events.some((ev)=>new Date(ev.start).getHours() === hour)}
                    >{hour}:00</option>
                  )}
                </select>              
              </label>
              <label style={{flexGrow: 1}}> Hora de fin
                
                <select name="hora-fin" value={horaMax} onChange={(e)=>{
                  setHoraMax(+e.target.value)
                }}>
                  {Array.from({length:14}, (_, hour)=> hour + 11).map(hour => 
                    <option 
                      key={hour} 
                      value={hour} 
                      disabled={
                        (horaMin ?? 0) >= hour ||
                        
                        hour > new Date(events.filter(ev => new Date(ev.start).getHours() > (horaMin ?? 0)).at(0)?.start).getHours()
                      }
                    >{hour}:00</option>
                  )}
                </select>              
              </label>
            </div>
            <label> Teléfono
              <input name="telefono" />
            </label>

          </div>
        </section>
        <menu style={{display: 'flex', gap: 16, justifyContent: 'center'}}>
          <button id="cancel" type="reset">Cerrar</button>
          <button type="submit">Confirmar</button>
        </menu>
      </form>
    </dialog>
  )
}

const Reserve = forwardRef(ReserveInner)

export { Reserve }

