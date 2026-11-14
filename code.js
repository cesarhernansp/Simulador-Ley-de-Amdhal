

function leerNumero(selector) {
    const texto = document.querySelector(selector).value.trim().replace(",", ".");
    return texto === "" ? NaN : Number(texto);
}

function fmt(n) {
    return Number(n.toFixed(4)).toString();
}

const EXPLICACION_VACIA = `<h3>Explicación</h3><p>Aquí aparecerá la interpretación de tu resultado.</p>`;


const formulariosimple = document.querySelector("#formulario-1-mejora");
const caja = document.querySelector("#caja-1-mejora");
const explicacion1 = document.querySelector("#explicacion-1-mejora");

const CAJA_1_INICIAL = `
    <div class="formula">TEn = TEa × [(1 − fm) + fm / speedup]</div>
    <div class="vacio">Completa los datos y pulsa Calcular.</div>`;

formulariosimple.addEventListener("submit", (e) => {
    e.preventDefault();

    const ta = leerNumero("#input-ta-1-mejora");
    const fm = leerNumero("#input-fm-1-mejora");
    const speedUp = leerNumero("#input-speedup-1-mejora");

    let error = "";
    if ([ta, fm, speedUp].some(Number.isNaN)) {
        error = "Completa los tres campos con números válidos.";
    } else if (ta <= 0) {
        error = "El tiempo antiguo (TEa) debe ser mayor que 0.";
    } else if (fm < 0 || fm > 1) {
        error = "La fracción mejorada (fm) debe estar entre 0 y 1.";
    } else if (speedUp <= 0) {
        error = "El speedup debe ser mayor que 0.";
    }

    if (error) {
        caja.innerHTML = `
            <div class="formula">TEn = TEa × [(1 − fm) + fm / speedup]</div>
            <div class="error">${error}</div>`;
        explicacion1.innerHTML = EXPLICACION_VACIA;
        return;
    }

    const factor = (1 - fm) + (fm / speedUp);
    const ten = ta * factor;
    const speedupGlobal = ta / ten;

    caja.innerHTML = `
        <div class="formula">TEn = TEa × [(1 − fm) + fm / speedup]</div>
        <div class="sustitucion">TEn = ${fmt(ta)} × [(1 − ${fmt(fm)}) + ${fmt(fm)} / ${fmt(speedUp)}]</div>
        <div class="sustitucion">TEn = ${fmt(ta)} × ${fmt(factor)}</div>
        <div class="resultado-final">
            <span>Tiempo de ejecución nuevo</span>
            <strong>${fmt(ten)} s</strong>
        </div>`;

    const cambio = speedUp > 1 ? "más rápida" : (speedUp < 1 ? "más lenta" : "igual");
    const veces = speedUp > 1 ? speedUp : (speedUp < 1 ? 1 / speedUp : 1);
    const conclusion = speedupGlobal > 1
        ? `El sistema completo queda ${fmt(speedupGlobal)} veces más rápido.`
        : (speedupGlobal < 1
            ? `El sistema completo queda ${fmt(1 / speedupGlobal)} veces más lento.`
            : `El sistema completo no cambia.`);

    explicacion1.innerHTML = `
        <h3>Explicación</h3>
        <p>El ${fmt(fm * 100)}% del tiempo original (${fmt(ta * fm)} s) pasa a ser ${veces === 1 ? "igual" : fmt(veces) + " veces " + cambio}.
        El ${fmt((1 - fm) * 100)}% restante (${fmt(ta * (1 - fm))} s) no cambia.</p>
        <p>Speedup global = TEa / TEn = ${fmt(ta)} / ${fmt(ten)} = <b>${fmt(speedupGlobal)}</b>. ${conclusion}</p>`;
});

formulariosimple.addEventListener("reset", () => {
    caja.innerHTML = CAJA_1_INICIAL;
    explicacion1.innerHTML = EXPLICACION_VACIA;
});


const formularioMultiples = document.querySelector("#formulario-multiple-mejora");
const barraTotal = document.querySelector("#barra-total");
const textoResultado = document.querySelector("#texto-resultado");
const explicacion2 = document.querySelector("#explicacion-multiple-mejora");

const TEXTO_2_INICIAL = "Ingresa el tiempo de cada parte y pulsa Calcular.";

function limpiarBloque2() {
    barraTotal.innerHTML = "";
    textoResultado.className = "vacio";
    textoResultado.textContent = TEXTO_2_INICIAL;
    explicacion2.innerHTML = EXPLICACION_VACIA;
}

formularioMultiples.addEventListener("submit", (e) => {
    e.preventDefault();

    const mejorable = leerNumero("#input-mejorable");
    const noMejorable = leerNumero("#input-no-mejorable");

    let error = "";
    if (Number.isNaN(mejorable) || Number.isNaN(noMejorable)) {
        error = "Completa ambos campos con números válidos.";
    } else if (mejorable < 0 || noMejorable < 0) {
        error = "Los tiempos no pueden ser negativos.";
    } else if (mejorable + noMejorable === 0) {
        error = "La suma de las dos partes no puede ser 0.";
    }

    if (error) {
        barraTotal.innerHTML = "";
        textoResultado.className = "error";
        textoResultado.textContent = error;
        explicacion2.innerHTML = EXPLICACION_VACIA;
        return;
    }

    const total = mejorable + noMejorable;
    const pMej = (mejorable / total) * 100;
    const pNo = (noMejorable / total) * 100;
    const fm = mejorable / total;

    barraTotal.innerHTML = `
        <div class="seg-mejorable" style="width:${pMej}%" title="Parte mejorable: ${pMej.toFixed(1)}%">
            ${pMej > 12 ? "Mejorable" : ""}
        </div>
        <div class="seg-no-mejorable" style="width:${pNo}%" title="Parte no mejorable: ${pNo.toFixed(1)}%">
            ${pNo > 18 ? "No mejorable" : ""}
        </div>`;

    textoResultado.className = "";
    textoResultado.innerHTML = `
        Mejorable = ${fmt(mejorable)} s (${pMej.toFixed(1)}%)<br>
        No mejorable = ${fmt(noMejorable)} s (${pNo.toFixed(1)}%)<br>
        Total = ${fmt(total)} s &nbsp;|&nbsp; fm = ${fmt(fm)}`;

    const limite = fm === 1
        ? "no hay parte fija, así que no existe un límite."
        : `${fmt(1 / (1 - fm))}.`;

    explicacion2.innerHTML = `
        <h3>Explicación</h3>
        <p>La parte mejorable es el ${pMej.toFixed(1)}% del tiempo total, por lo que <b>fm = ${fmt(fm)}</b>.
        Puedes usar este valor en el simulador de la izquierda.</p>
        <p>La parte no mejorable (${fmt(noMejorable)} s) siempre se mantiene. Aunque el speedup fuera infinito,
        el speedup global máximo es 1 / (1 − fm) = ${limite}</p>`;
});

formularioMultiples.addEventListener("reset", limpiarBloque2);

limpiarBloque2();

const formularioSpeedup = document.querySelector("#formulario-speedup");
const cajaSpeedup = document.querySelector("#caja-speedup");
const explicacionSpeedup = document.querySelector("#explicacion-speedup");

const CAJA_SPEEDUP_INICIAL = `
    <div class="formula">Speedup = TEa / TEn</div>
    <div class="vacio">Ingresa TEa y TEn y pulsa Calcular.</div>`;

formularioSpeedup.addEventListener("submit", (e) => {
    e.preventDefault();

    const ta = leerNumero("#input-ta-speedup");
    const ten = leerNumero("#input-ten-speedup");

    let error = "";
    if (Number.isNaN(ta) || Number.isNaN(ten)) {
        error = "Completa ambos campos con números válidos.";
    } else if (ta <= 0 || ten <= 0) {
        error = "TEa y TEn deben ser mayores que 0.";
    }

    if (error) {
        cajaSpeedup.innerHTML = `
            <div class="formula">Speedup = TEa / TEn</div>
            <div class="error">${error}</div>`;
        explicacionSpeedup.innerHTML = EXPLICACION_VACIA;
        return;
    }

    const speedup = ta / ten;

    cajaSpeedup.innerHTML = `
        <div class="formula">Speedup = TEa / TEn</div>
        <div class="sustitucion">Speedup = ${fmt(ta)} / ${fmt(ten)}</div>
        <div class="resultado-final">
            <span>Speedup</span>
            <span>x${fmt(speedup)}</span>
        </div>`;

    let conclusion;
    if (speedup > 1) {
        conclusion = `El sistema nuevo es <b>${fmt(speedup)} veces más rápido</b> que el antiguo.`;
    } else if (speedup < 1) {
        conclusion = `El sistema nuevo es <b>${fmt(1 / speedup)} veces más lento</b> que el antiguo (empeoró).`;
    } else {
        conclusion = `El sistema nuevo tarda <b>lo mismo</b> que el antiguo: no hubo cambio.`;
    }

    explicacionSpeedup.innerHTML = `
        <h3>Explicación</h3>
        <p>El tiempo pasó de ${fmt(ta)} s a ${fmt(ten)} s.</p>
        <p>${conclusion}</p>
        <p>Un speedup mayor que 1 indica mejora, y menor que 1 indica que empeoró.</p>`;
});

formularioSpeedup.addEventListener("reset", () => {
    cajaSpeedup.innerHTML = CAJA_SPEEDUP_INICIAL;
    explicacionSpeedup.innerHTML = EXPLICACION_VACIA;
});

