import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, Alert, TouchableOpacity, Image, TextInput} from 'react-native';
import ModalBox from './assets/Modal';
import CheckBoxGroup from './assets/CheckBoxGroup'
import { Formik, ErrorMessage} from 'formik';
import { Checkbox, Container, NativeBaseProvider, Radio } from 'native-base'
import { styles, stylesFilter, styleButton, styleInput, styleNavbar, styleText, styleImagenTutor, styleTutor } from './assets/Styles'
import axios from 'axios'

const api = axios.create({
  baseURL: `yourendpointUsers`
})

const api_peticion = axios.create({
  baseURL: `yourendpointPetition`
})

const Buscar = () => {
  const[filtro, setFiltro] = useState(false);
  const[tutoresFetch, setTutoresFetch] = useState([]);
  const updateFiltro = (values) => {
    setFiltro(!filtro)
    //logica filtrar
    setTutoresFetch(tutoresFetch.filter((tutor) => compararDato(tutor.datos.nombre.toLowerCase(), values.nombre.toLowerCase()) 
    && compararDato(tutor.datos.apellido.toLowerCase(), values.apellido.toLowerCase())
    && compararArr(tutor.datos.asignaturas, values.asignaturas)
    && checkDia(tutor.horario, values.horario)
    && checkCalificacion(tutor.datos.puntaje, values.calificacion)
    ))
  }

  const checkCalificacion = (tutorCal, selectCal) =>{
    if(parseInt(tutorCal) >= parseInt(selectCal)){
      return true
    }
    else{
      return false
    }

  }

  const checkDia = (horario, horarioSelec) => {
    for(const diaSelec in horarioSelec){
      for(let dia of Object.keys(horario)){
        if(dia === horarioSelec[diaSelec] && dia !== "_id"){
          if(horario[dia].length === 0){
            return false
          }
        }
      }
    }
    return true
  }

  const compararDato = (dato1, dato2) => {
    dato1 = dato1.toLowerCase()
    dato2 = dato2.toLowerCase()
    if(dato2 === ""){
      return true
    }
    if(dato1 === dato2){
      return true
    }
    else{
      return false
    }
  }

  const compararArr = (arr1, arr2) => {
    if(arr2.length === 0){
      return true
    }
    for(let valor1 of arr2){
      if(!(arr1.includes(valor1))){
        return false
      }
    }
    return true
  }
  const enviarSolicitud = async (id_tutor) => {
    if(tutoresFetch.length !== 0){
      Alert.alert(
        "Error al solicitar tutoría",
        "Debe iniciar sesión",
        [
          {
            text: "OK",
          }

        ]
      )
      return
    }
    try{
      const response = await api_peticion.post('/agregarPeticion', 
                { estudiante_id: estudianteID, tutor_id: id_tutor }, 
                  {
                  headers: {
                  'Content-type': 'application/json',
                  'x-token': mi_token
                  }
                  }
                )
                console.log(response)
      if(!response.data.ok){
        alert("Ya realizó una solicitud de chat virtual con este tutor anteriormente.")
      }
      else{
        alert("Usted realizó una solicitud de chat virtual.")
      }
    }catch(error){
      console.log(error)
    }
  }
  
  useEffect(() => {
    const obtenerTutores = async () => {
      try{
          if(!filtro){
            const response = await api.get('/obtenerTutores');
            if(response && response.data.tutores) setTutoresFetch(response.data.tutores);
          }
        } catch(err){
          console.log(err)
        }
      }
    obtenerTutores();
  }, [filtro])

  return(
      <ScrollView
      contentContainerStyle={styles.wrapper}
      key="scroll-app"
      >
      <View style={styleNavbar.navbar}>
        <Text style={styleNavbar.navtext}>MiTutorWeb</Text>
      </View>
      <View style={styles.container}>
        <Text style={styleText.titulo} key="titulo">Buscar Tutor</Text>
        <View style={styles.container}>
        <Formik initialValues={{
            nombre: '',
            apellido: '',
            asignaturas: '',
            horario: '',
            calificacion: '1.0'
          }}
          onSubmit={values => updateFiltro(values)}>
            {({handleSubmit, handleBlur, handleChange, values, setFieldValue}) => (
            <View style={styles.filter}>
                  <TextInput placeholder="Nombre" style={styleInput.input} value={values.nombre} onChangeText={handleChange('nombre')} onBlur={handleBlur('nombre')}/>
                  <ErrorMessage name="nombre"/>
                  <TextInput placeholder="Apellido" style={styleInput.input} value={values.apellido} name="apellido" onChangeText={handleChange('apellido')} onBlur={handleBlur('apellido')}/>
                  <ErrorMessage name="apellido"/>
                  <NativeBaseProvider>
                    <Container>
                      <View style={stylesFilter.container}>
                        <Text>Horario</Text>
                          <CheckBoxGroup 
                            checkboxes={
                              [
                              <Checkbox value="Lunes">Lunes</Checkbox>,
                              <Checkbox value="Martes">Martes</Checkbox>,
                              <Checkbox value="Miércoles">Miércoles</Checkbox>,
                              <Checkbox value="Jueves">Jueves</Checkbox>,
                              <Checkbox value="Viernes">Viernes</Checkbox>,
                              <Checkbox value="Sábado">Sábado</Checkbox>,
                              <Checkbox value="Domingo">Domingo</Checkbox>
                              ]
                            }
                            func = {setFieldValue}
                            field="horario"/>
                      </View>
                      <View style={stylesFilter.container}>
                        <Text>Asignaturas</Text>
                          <CheckBoxGroup 
                            checkboxes={
                              [
                        <Checkbox value="Cálculo Diferencial">Cálculo Diferencial</Checkbox>,
                        <Checkbox value="Cálculo Integral">Cálculo Integral</Checkbox>,
                        <Checkbox value="Cálculo Vectorial">Cálculo Vectorial</Checkbox>,
                        <Checkbox value="Ecuaciones Diferenciales">Ecuaciones Diferenciales</Checkbox>,
                        <Checkbox value="Física I">Física I</Checkbox>,
                        <Checkbox value="Física II">Física II</Checkbox>,
                        <Checkbox value="Física III">Física III</Checkbox>,
                        <Checkbox value="Física IV">Física IV</Checkbox>,
                        <Checkbox value="Ingeniería de Requisitos">Ingeniería de Requisitos</Checkbox>,
                        <Checkbox value="Estructura de Datos">Estructura de Datos </Checkbox>,
                        <Checkbox value="Diseño Web">Diseño Web</Checkbox>,
                              ]
                            }
                            func = {setFieldValue}
                            field="asignaturas"/>
                      </View>
                      <View style={stylesFilter.container}>
                        <Text>Calificación</Text>
                        <Radio.Group accessibilityLabel="Calificacion" defaultValue="1.0">
                          <Radio onPress={() => setFieldValue('calificacion', '1.0')} value="1.0">1.0</Radio>
                          <Radio onPress={() => setFieldValue('calificacion', '2.0')} value="2.0">2.0</Radio>
                          <Radio onPress={() => setFieldValue('calificacion', '3.0')} value="3.0">3.0</Radio>
                          <Radio onPress={() => setFieldValue('calificacion', '4.0')} value="4.0">4.0</Radio>
                          <Radio onPress={() => setFieldValue('calificacion', '5.0')} value="5.0">5.0</Radio>
                        </Radio.Group>
                      </View>
                    </Container>
                  </NativeBaseProvider>
            <TouchableOpacity style={styleButton.botonBuscar} onPress={handleSubmit}>
              <Text style={styleText.textButton}>Buscar</Text>
            </TouchableOpacity>
            </View>
            )}
        </Formik>
        </View>
          {
            tutoresFetch &&
            <>
              {
                tutoresFetch.length === 0 ?
                  <Text key="no-existen">No existen tutores</Text>
                  :
                  tutoresFetch.map((tutor, i)=> {
                    return <>
                      <View key={i} style={styleTutor.container}>
                        <View key={i+"2"} style={styleTutor.containerTutor}>
                          <Image source={require('../IOS-MiTutorWeb/assets/imagenTutor.png')} style={styleImagenTutor.imagen}></Image>
                          <Text key={tutor.datos.nombre} style={styleText.text}>{tutor.datos.nombre} {tutor.datos.apellido}</Text>
                          <Text key={tutor.datos.puntaje} style={styleText.text}>Puntaje: {tutor.datos.puntaje}</Text>
                          <View key={i+"3"} style={styleTutor.containerBotones}>
                            <ModalBox title="Ver Horario" data={tutor.horario}/>
                            <ModalBox title="Asignaturas" data={tutor.datos.asignaturas}/>
                            <TouchableOpacity style={styleButton.botonEliminar} onPress={enviarSolicitud}>
                              <Text style={styleText.textButton}>Solicitar Tutoría</Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    </>
                  })
              }
            </>
          }
        <StatusBar style="auto" key="status" />
      </View>
      </ScrollView>
  );
}

export default Buscar
