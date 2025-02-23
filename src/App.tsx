//import ReactConfetti from "react-confetti";
import Calendar from "./components/calendar";
import { Reserve } from "./components/reserve";
import { useCallback, useMemo, useRef } from "react";
import { DateClickArg } from "@fullcalendar/interaction/index.js";
import FacebookPage from "./components/facebook-page";
import { WhatsAppWidget } from 'react-whatsapp-widget';
import 'react-whatsapp-widget/dist/index.css';


function App() {
  const reserveDialog = useRef<
    HTMLDialogElement & {
      closeReserve: () => void;
      showReserve: (data: {
        date: Date;
        events: { title: string; start: string; end: string }[];
      }) => void;
    }
  >(null);

  const events = useMemo(
    () => [
      {
        title: "Reservada",
        start: "2025-01-12T18:00:00",
        end: "2025-01-12T19:00:00",
      },
      {
        title: "Reservada",
        start: "2025-01-12T21:00:00",
        end: "2025-01-12T22:00:00",
      },
      // Añade más eventos aquí
    ],
    []
  );

  const onClick = useCallback(
    (e: DateClickArg) => {
      console.log(e);
      reserveDialog.current?.showReserve({ date: e.date, events });
    },
    [events]
  );

  return (
    <>
      {/*<ReactConfetti
        numberOfPieces={50}
        gravity={0.05}
        width={window.innerWidth - 10}
      />*/}
      <div
        className="z-10 relative overflow-auto h-screen p-0 md:px-[15%] text-center"      
      >
        <header className="flex flex-col items-center justify-between">
          <div className="header-title"><h1 className="py-2">Bienvenidos</h1>
          <div className="px-4"><img src="/logo.jpg" alt="Sala Tokio" className="rounded-md"/></div></div>

          <label className="menu-button">
            <input type="checkbox" className="hidden" id="menu-button" />
            <div className="border border-[#ff6f61]"></div>
            <div className="border border-[#ff6f61]"></div>
            <div className="border border-[#ff6f61]"></div>
          </label>
          
          <nav className="fixed border-l border-amber-50 w-3/4 h-lvh right-0 top-0 bg-[#ff6f61] z-100 md:relative md:block py-16 md:border-0 md:w-auto md:h-auto md:py-0">
            <ul className="flex flex-col items-start text-left gap-6 md:block md:text-center" onClick={()=>setTimeout(()=>{
              const checkBox = document.querySelector('#menu-button') as HTMLInputElement
              checkBox.checked = false
            })}>
              <li>
                <a href="#inicio">Inicio</a>
              </li>
              <li>
                <a href="#calendario">Calendario de Reservas</a>
              </li>
              <li>
                <a href="#galeria">Galería</a>
              </li>
              <li>
                <a href="#contacto">Información y Contacto</a>
              </li>
              <li>
                <a href="#tarifas">Tarifas</a>
              </li>
              <li>
                <a href="#redes">Redes</a>
              </li>
            </ul>
          </nav>

          <a className="md:hidden flex flex-col mb-2" href="#inicio">
            <div className="md:hidden chevron"></div>
            <div className="md:hidden chevron chevron2"></div>
          </a>
        </header>

        <section id="inicio">
          <h2>¡Celebra con nosotros!</h2>
          <p>
            ¡Descubre la <b>Sala Tokio</b>, el lugar perfecto para tus
            celebraciones en Torrejón de Ardoz! Si buscas un espacio para
            fiestas que combine comodidad y diversión, nuestra sala es la
            elección ideal tanto para cumpleaños de niños como para eventos de
            adultos. Con un diseño versátil y amplio, ofrecemos todas las
            comodidades necesarias para que disfrutes al máximo, y todo está
            incluido en el precio de alquiler.
          </p>

          <p>
            En la <b>Sala Tokio</b>, no solo te proporcionamos un espacio
            excepcional, sino que también te ofrecemos la opción de contratar
            servicios adicionales. Desde catering y decoración hasta animación,
            nuestros proveedores de confianza se encargarán de cada detalle para
            que tú solo te preocupes por disfrutar. ¡Olvídate de las
            preocupaciones y deja que nosotros nos encarguemos de todo!
          </p>

          <p>
            ¿Prefieres llevar tu propia comida y bebida? ¡No hay problema!
            Nuestra sala te ofrece la libertad total para organizar tu fiesta a
            tu manera.
          </p>

          <p>
            Con 175 m², nuestra sala está dividida en cuatro áreas perfectamente
            diseñadas para acoger hasta 60 personas:
          </p>

          <ul>
            <li>
              <b>Zona para Adultos:</b> Disfruta de un equipo de sonido con
              DVD/CD y USB, TV, cómodos sillones, consola de videojuegos, diana
              y futbolín.
            </li>

            <li>
              <b>Zona Infantil:</b> Ahora tenemos el gran parque de bolas con el trampolín, 
              y un trampolín pequeño, y también mesas que se abren y recogen para los más pequeños
            </li>

            <li>
              <b>Zona Comedor:</b> 4 mesas, 6 bancos, sillas, nevera, arcón, cafetera, microondas, horno, una barra con taburetes...
              Y también en esta zona otra tele grande con altavoz conectaba a wifi.
            </li>

            <li>
              <b>Sala de Lactancia y Baños:</b> Dos baños completos, uno
              adaptado, y una sala de lactancia con sillón y cambiador para
              mayor comodidad.
            </li>
          </ul>

          <p>
            ¡Ven y celebra con nosotros en la <b>Sala Tokio</b>, donde cada
            detalle está pensado para que tu evento sea inolvidable!
          </p>
        </section>

        <section id="calendario">
          <h2>Calendario de Reservas</h2>
          <Calendar events={events} onClick={onClick} />
        </section>

        <Reserve ref={reserveDialog} />

        {/*<section id="reservas">
      <h2>Reservas</h2>
      <p>Reserva tu evento con nosotros de manera fácil y rápida.</p>
      <form style={{width: 400, margin: 'auto'}}>
          <label htmlFor="nombre">Nombre:</label>
          <input type="text" id="nombre" name="nombre" required />
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />
          <label htmlFor="fecha">Fecha del Evento:</label>
          <input type="date" id="fecha" name="fecha" required />
          <button type="submit">Reservar</button>
      </form>
    </section>*/}

        <section id="galeria">
          <h2>Galería</h2>
          <p>Explora fotos de nuestros eventos pasados.</p>
          {/*<!-- Aquí puedes añadir imágenes -->*/}
        </section>

        <section id="contacto">
          <h2>Información y Contacto</h2>
          <div>
            <ul>
              <li>
                <b>Gerente:</b> Bianca
              </li>
              <li>
                <b>Email de Contacto:</b> torrejon2@aturollo.es
              </li>
              <li>
                <b>Teléfono:</b> (+34) 673 247 720
              </li>
              <li>
                <b>Dirección:</b> Calle Cal, nº 7, 28850 Torrejón de Ardoz,
                Madrid
              </li>
            </ul>
            <ul>
              <li>
                <b>Aforo:</b> 60 personas
              </li>
              <li>
                <b>Superficie:</b> 175 m<sup>2</sup>
              </li>
              <li>
                <b>Horario:</b> 10:00 a 24:00
              </li>
            </ul>
          </div>
        </section>

        <section id="tarifas">
          <h2>Tarifas</h2>

          <div>
            <div>
              <h3>Lunes a Jueves</h3>
              <ul>
                <li>2 horas 115 €</li>
                <li>3 horas 130 €</li>
                <li>4 horas 150 €</li>
                <li>5 horas 170 €</li>
                <li>6 horas 190 €</li>
                <li>7 horas 205 €</li>
                <li>Hora extra 25 €</li>
              </ul>
            </div>
            <div>
              <h3>Viernes y Vísperas de Festivo</h3>
              <ul>
                <li>4 horas 175 €</li>
                <li>5 horas 200 €</li>
                <li>6 horas 220 €</li>
                <li>7 horas 240 €</li>
                <li>Hora extra 30 €</li>
              </ul>
            </div>
            <div>
              <h3>Sábados, Domingos y Festivos</h3>
              <ul>
                <li>4 horas 195 €</li>
                <li>5 horas 215 €</li>
                <li>6 horas 235 €</li>
                <li>7 horas 255 €</li>
                <li>Hora extra 30 €</li>
              </ul>
            </div>
          </div>
          <p>
            Todos nuestros precios incluyen IVA. Tarifas válidas hasta el 31 de
            Diciembre de 2025.
          </p>

          <p>
            Si durante la fiesta, decides quedarte más tiempo, podrás avisarnos
            telefónicamente para confirmar que quieres horas extras (sujeta a
            disponibilidad).
          </p>

          <p>
            Consultar precios para Nochebuena, Navidad, Nochevieja, Año Nuevo y
            Reyes.
          </p>
        </section>

        <section id="equipamiento">
          <h2>Equipamiento</h2>
          <ul>
            <li>Mesas, sillas</li>
            <li>Bancos de catering</li>
            <li>Cama elástica</li>
            <li>Cafetera</li>
            <li>Futbolín</li>
            <li>Consola</li>
            <li>Sofá</li>
            <li>Canasta</li>
            <li>Horno</li>
            <li>Bola discoteca</li>
            <li>Casita juguetes</li>
            <li>Piscina de bolas</li>
            <li>Consola</li>
            <li>Nevera</li>
            <li>Congelador</li>
            <li>Microondas</li>
            <li>Sandwichera</li>
            <li>Mesas y sillas infantiles</li>
            <li>Juguetes infantiles</li>
            <li>Equipo de música</li>
            <li>Diana</li>
            <li>Pared de pizarra</li>
          </ul>
        </section>
        
        <section id="redes">
        <h2>Redes</h2>
          <FacebookPage/>
          <WhatsAppWidget 
            className="prueba"
            phoneNumber="34678174012"
            message={`Hola, bienvenido! 👋🏼 \n\n¿Puedo ayudarte en algo?`}
            sendButtonText="enviar"
            inputPlaceHolder="Escribe un mensaje"
            companyName="Sala Tokio"
            replyTimeText="Normalmente responde en menos de hora."
          />
        </section>

        <footer>
          <p>
            &copy; 2025 Sala de Fiestas Tokio. Todos los derechos reservados.
          </p>
        </footer>
      </div>
    </>
  );
}

export default App;
