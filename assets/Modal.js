import { useState } from "react"
import { Modal, Text, TouchableOpacity, View, ScrollView} from "react-native"

import { styles, styleButton, styleText, styleModal } from './Styles'

const ModalBox = (props) => {
    const [modalVisible, setModalVisible] = useState(false)
    return(
        <>
            <Modal visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <ScrollView contentContainerStyle={styles.wrapper}>
                <View style={styleModal.modalView}>
                    <Text style={styleText.text}>{JSON.stringify(props.data)}</Text>
                    <TouchableOpacity onPress={() => setModalVisible(false)} style={styleButton.botonEliminar}>
                        <Text style={styleText.textButton}>Close</Text>
                    </TouchableOpacity>
                </View>
        </ScrollView>
            </Modal>
            <TouchableOpacity style={styleButton.botonAgregar} onPress={() => {setModalVisible(true)}}>
                <Text style={styleText.textButton}>{props.title}</Text>
            </TouchableOpacity>
        </>
    )
}
export default ModalBox