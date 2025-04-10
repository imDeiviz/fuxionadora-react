import { useState } from 'react';
import { TARIFAS, DIAS_MES, ALQUILER_CONTADOR, IVA, IMPUESTO_ELECTRICIDAD, IMPUESTO_GAS } from '../constants/rates';

export const useEnergyCalculator = () => {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  // Cálculos para electricidad (luz)
  const calculateNaturgyLuz = (values) => {
    const { consumo, potenciaP1, potenciaP2, mantenimiento } = values;
    
    const costoEnergia = consumo * TARIFAS.naturgy.luz.porUso.energia;
    const costoPotencia = (potenciaP1 * TARIFAS.naturgy.luz.potencia.p1 + 
                          potenciaP2 * TARIFAS.naturgy.luz.potencia.p2) * DIAS_MES;
    const costoMantenimiento = mantenimiento ? 
      TARIFAS.naturgy.luz.mantenimiento * (1 - TARIFAS.naturgy.luz.descuentoMantenimiento) : 0;

    const subtotal = costoEnergia + costoPotencia + costoMantenimiento;
    const impuestoElectricidad = subtotal * IMPUESTO_ELECTRICIDAD;
    const baseFactura = subtotal + impuestoElectricidad + ALQUILER_CONTADOR;
    const iva = baseFactura * IVA;
    
    return {
      compania: 'Naturgy',
      tipoEnergia: 'luz',
      costoEnergia,
      costoPotencia,
      costoMantenimiento,
      subtotal,
      impuestoElectricidad,
      baseFactura,
      iva,
      total: baseFactura + iva
    };
  };

  const calculateRepsolLuz = (values) => {
    const { consumo, potenciaP1, potenciaP2, mantenimiento } = values;
    
    const costoEnergia = consumo * (mantenimiento ? 
      TARIFAS.repsol.luz.energia.conMantenimiento : 
      TARIFAS.repsol.luz.energia.normal);
    const costoPotencia = (potenciaP1 * TARIFAS.repsol.luz.potencia.p1 + 
                          potenciaP2 * TARIFAS.repsol.luz.potencia.p2) * DIAS_MES;
    const costoMantenimiento = mantenimiento ? TARIFAS.repsol.luz.mantenimiento : 0;

    const subtotal = costoEnergia + costoPotencia + costoMantenimiento;
    const impuestoElectricidad = subtotal * IMPUESTO_ELECTRICIDAD;
    const baseFactura = subtotal + impuestoElectricidad + ALQUILER_CONTADOR;
    const iva = baseFactura * IVA;
    
    return {
      compania: 'Repsol',
      tipoEnergia: 'luz',
      costoEnergia,
      costoPotencia,
      costoMantenimiento,
      subtotal,
      impuestoElectricidad,
      baseFactura,
      iva,
      total: baseFactura + iva
    };
  };

  const calculateEndesaLuz = (values) => {
    const { consumo, potenciaP1, potenciaP2, mantenimiento, gasEndesa } = values;
    const totalPotencia = potenciaP1 + potenciaP2;
    const contratarMantenimiento = mantenimiento && totalPotencia >= 3;

    let precioEnergia = TARIFAS.endesa.luz.tarifaLibre.sinPermanencia.precioBase;
    if (contratarMantenimiento && gasEndesa) {
      precioEnergia = TARIFAS.endesa.luz.tarifaLibre.sinPermanencia.precioAmbos;
    } else if (contratarMantenimiento) {
      precioEnergia = TARIFAS.endesa.luz.tarifaLibre.sinPermanencia.precioMantenimiento;
    } else if (gasEndesa) {
      precioEnergia = TARIFAS.endesa.luz.tarifaLibre.sinPermanencia.precioGas;
    }

    const costoEnergia = consumo * precioEnergia;
    const costoPotencia = ((potenciaP1 * 0.1136) + (potenciaP2 * 0.04)) * DIAS_MES;
    const costoMantenimiento = contratarMantenimiento ? 
      TARIFAS.endesa.luz.tarifaLibre.sinPermanencia.mantenimiento : 0;

    const subtotal = costoEnergia + costoPotencia + costoMantenimiento;
    const impuestoElectricidad = subtotal * IMPUESTO_ELECTRICIDAD;
    const baseFactura = subtotal + impuestoElectricidad + ALQUILER_CONTADOR;
    const iva = baseFactura * IVA;
    
    return {
      compania: 'Endesa',
      tipoEnergia: 'luz',
      costoEnergia,
      costoPotencia,
      costoMantenimiento,
      subtotal,
      impuestoElectricidad,
      baseFactura,
      iva,
      total: baseFactura + iva
    };
  };

  // Cálculos para gas
  const calculateNaturgyGas = (values) => {
    const { consumoGas, rangoConsumo, mantenimiento } = values;
    
    const terminoFijo = TARIFAS.naturgy.gas[rangoConsumo].terminoFijo * DIAS_MES;
    const terminoVariable = consumoGas * TARIFAS.naturgy.gas[rangoConsumo].terminoVariable;
    const costoMantenimiento = mantenimiento ? TARIFAS.naturgy.gas.mantenimiento : 0;

    const subtotal = terminoFijo + terminoVariable + costoMantenimiento;
    const impuestoGas = subtotal * IMPUESTO_GAS;
    const baseFactura = subtotal + impuestoGas + ALQUILER_CONTADOR;
    const iva = baseFactura * IVA;
    
    return {
      compania: 'Naturgy',
      tipoEnergia: 'gas',
      terminoFijo,
      terminoVariable,
      costoMantenimiento,
      subtotal,
      impuestoGas,
      baseFactura,
      iva,
      total: baseFactura + iva
    };
  };

  const calculateRepsolGas = (values) => {
    const { consumoGas, rangoConsumo, mantenimiento } = values;
    
    const terminoFijo = TARIFAS.repsol.gas[rangoConsumo].terminoFijo * DIAS_MES;
    const terminoVariable = consumoGas * (mantenimiento ? 
      TARIFAS.repsol.gas[rangoConsumo].terminoVariable.conMantenimiento : 
      TARIFAS.repsol.gas[rangoConsumo].terminoVariable.normal);
    const costoMantenimiento = mantenimiento ? TARIFAS.repsol.gas.mantenimiento : 0;

    const subtotal = terminoFijo + terminoVariable + costoMantenimiento;
    const impuestoGas = subtotal * IMPUESTO_GAS;
    const baseFactura = subtotal + impuestoGas + ALQUILER_CONTADOR;
    const iva = baseFactura * IVA;
    
    return {
      compania: 'Repsol',
      tipoEnergia: 'gas',
      terminoFijo,
      terminoVariable,
      costoMantenimiento,
      subtotal,
      impuestoGas,
      baseFactura,
      iva,
      total: baseFactura + iva
    };
  };

  const calculateEndesaGas = (values) => {
    const { consumoGas, rangoConsumo, mantenimiento, paquete } = values;
    
    const terminoFijo = TARIFAS.endesa.gas[rangoConsumo].terminoFijo;
    let precioVariable;
    
    switch(paquete) {
      case 'gasOkGas':
        precioVariable = TARIFAS.endesa.gas[rangoConsumo].precios.gasOkGas;
        break;
      case 'gasLuz':
        precioVariable = TARIFAS.endesa.gas[rangoConsumo].precios.gasLuz;
        break;
      case 'gasLuzOkGas':
        precioVariable = TARIFAS.endesa.gas[rangoConsumo].precios.gasLuzOkGas;
        break;
      default: // soloGas
        precioVariable = TARIFAS.endesa.gas[rangoConsumo].precios.soloGas;
    }
    
    const terminoVariable = consumoGas * precioVariable;
    const costoMantenimiento = mantenimiento ? TARIFAS.endesa.gas.mantenimiento : 0;

    const subtotal = terminoFijo + terminoVariable + costoMantenimiento;
    const impuestoGas = subtotal * IMPUESTO_GAS;
    const baseFactura = subtotal + impuestoGas + ALQUILER_CONTADOR;
    const iva = baseFactura * IVA;
    
    return {
      compania: 'Endesa',
      tipoEnergia: 'gas',
      terminoFijo,
      terminoVariable,
      costoMantenimiento,
      subtotal,
      impuestoGas,
      baseFactura,
      iva,
      total: baseFactura + iva
    };
  };

  const calculateAllRates = (values) => {
    setLoading(true);
    try {
      let results = [];
      
      if (values.tipoEnergia === 'luz') {
        results = [
          calculateNaturgyLuz(values),
          calculateRepsolLuz(values),
          calculateEndesaLuz(values)
        ];
      } else {
        results = [
          calculateNaturgyGas(values),
          calculateRepsolGas(values),
          calculateEndesaGas(values)
        ];
      }
      
      setResults(results);
    } catch (error) {
      console.error('Error calculating rates:', error);
      setResults(null);
    } finally {
      setLoading(false);
    }
  };

  return { results, loading, calculateAllRates };
};
