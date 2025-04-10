export const DIAS_MES = 30;
export const ALQUILER_CONTADOR = 0.80;
export const IVA = 0.21;
export const IMPUESTO_ELECTRICIDAD = 0.005;
export const IMPUESTO_GAS = 0.00234;

export const TARIFAS = {
  naturgy: {
    luz: {
      porUso: { energia: 0.119166 },
      noche: {
        p1: 0.185461,
        p2: 0.116414,
        p3: 0.082334
      },
      potencia: {
        p1: 0.108163,
        p2: 0.033392
      },
      mantenimiento: 5.71,
      descuentoMantenimiento: 0.15
    },
    gas: {
      RL1: {
        terminoFijo: 0.15,
        terminoVariable: 0.08
      },
      RL2: {
        terminoFijo: 0.18,
        terminoVariable: 0.079
      },
      RL3: {
        terminoFijo: 0.22,
        terminoVariable: 0.075
      },
      mantenimiento: 4.50
    }
  },
  repsol: {
    luz: {
      energia: {
        normal: 0.139,
        conMantenimiento: 0.129
      },
      potencia: {
        p1: 0.136,
        p2: 0.136
      },
      mantenimiento: 5.65
    },
    gas: {
      RL1: {
        terminoFijo: 0.14,
        terminoVariable: {
          normal: 0.0799,
          conMantenimiento: 0.0699
        }
      },
      RL2: {
        terminoFijo: 0.17,
        terminoVariable: {
          normal: 0.0799,
          conMantenimiento: 0.0699
        }
      },
      RL3: {
        terminoFijo: 0.20,
        terminoVariable: {
          normal: 0.0799,
          conMantenimiento: 0.0699
        }
      },
      mantenimiento: 8.68
    }
  },
  endesa: {
    luz: {
      tarifaLibre: {
        sinPermanencia: {
          precioBase: 0.147500,
          precioMantenimiento: 0.143075,
          precioGas: 0.143075,
          precioAmbos: 0.138650,
          mantenimiento: 4.78
        }
      }
    },
    gas: {
      RL1: {
        terminoFijo: 6.50,
        precios: {
          soloGas: 0.0899,
          gasOkGas: 0.0869,
          gasLuz: 0.0869,
          gasLuzOkGas: 0.0839
        }
      },
      RL2: {
        terminoFijo: 12.10,
        precios: {
          soloGas: 0.0791,
          gasOkGas: 0.0764,
          gasLuz: 0.0764,
          gasLuzOkGas: 0.0738
        }
      },
      RL3: {
        terminoFijo: 25.05,
        precios: {
          soloGas: 0.0852,
          gasLuz: 0.0826
        }
      },
      mantenimiento: 9.55
    }
  }
};
