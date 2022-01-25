import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#e2e2e2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  filter: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#c0c0c0',
    borderRadius: 5
  }
});

export const styleNavbar = StyleSheet.create({
  navbar: {
    padding: 35,
    alignItems: 'center',
    backgroundColor: '#004369',
    width: '100%',
    color: '#fff',
  },
  navtext: {
    fontSize: 30,
    color: '#fff',
  },
})

export const styleText = StyleSheet.create({
  titulo: {
    fontSize: 40,
  },
  textButton: {
    fontSize: 30,
    color: '#fff'
  },
  text: {
    fontSize: 30,
  }
})

export const styleButton = StyleSheet.create({
  botonAgregar: {
    backgroundColor: '#01949a',
    borderRadius: 5,
    color: '#fff',
    padding: 10,
    margin: 10
  },
  botonEliminar: {
    backgroundColor: '#db1f48',
    borderRadius: 5,
    color: '#fff',
    padding: 10,
    margin: 10
  },
  botonBuscar: {
    backgroundColor: '#326bcf',
    borderRadius: 5,
    color: '#fff',
    padding: 10,
    margin: 5
  },
})

export const styleTutor = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderColor: '#c0c0c0',
    borderRadius: 5,
    flex: 1,
    padding: 10,
    margin: 10
  },
  containerTutor: {
    flexDirection: "column",
    padding: 10,
    margin: 10
  },
  containerBotones: {
    flexDirection: "column",
  }
})

export const styleImagenTutor = StyleSheet.create({
  imagen: {
    width: 200,
    height: 200,
    alignContent: 'center',
    alignItems: 'center'

  }
})

export const styleInput = StyleSheet.create({
  input: {
    height: 35,
    width: 200,
    padding: 2,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderRadius: 2
  }
})

export const stylesFilter = StyleSheet.create({
  container:{
    margin: 10,
    backgroundColor: '#fff'
  }
})

export const styleModal = StyleSheet.create({
    modalView: {
        marginTop: 'auto',
        marginBottom: 'auto',
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    }
})
