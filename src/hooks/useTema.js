import { useEffect, useState } from "react";
import { leerConfiguracion } from "../storage/almacenamiento";
import { TEMAS } from "../theme/colores";

export function useTema() {
  const [tema, setTema] = useState("oscuro");

  useEffect(() => {
    (async () => {
      const config = await leerConfiguracion();
      setTema(config.tema ?? "oscuro");
    })();
  }, []);

  return TEMAS[tema] ?? TEMAS.oscuro;
}
