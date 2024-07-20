import { PDFDownloadLink, Document, Page, View, Text, Image, PDFViewer, StyleSheet, Font } from "@react-pdf/renderer";
import { useUser } from "../context/Context.js"
import { useState, useRef, useEffect } from 'react'
import Button from './Button'
Font.register({ family: "Inter", src: "/assets/font.otf" })

const styles = StyleSheet.create({
    body: {
        padding: ".8cm",
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        alignItems: "center",
        backgroundColor: "#ffffff",
        fontSize: "8px",
        fontWeight: "100",
    },
    subtitle: {
        width: "100%",
        position: "relative",
        textAlign: "center",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#294B98",
        color: "#f2f2f2",

    },
    subtitle2: {
        width: "100%",
        position: "relative",
        textAlign: "center",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#294B98",
        color: "#f2f2f2",
        fontSize: '5.5px',
        padding: '1.5px 0'

    },
    title: {
        fontSize: '20px',
        fontWeight: '800',
        color: '#294B98',
        textAlign: 'center'
    },
    // boxBlue: {
    //     width: "100%",
    //     position: "relative",
    //     backgroundColor: "#294B98",
    //     color: "#f2f2f2",
    //     padding: "2px 5px 0px 5px ",

    // },



    container: {
        position: 'relative',
        width: "100%",
        border: '1px solid #294B98',
    },
    containerIntroItems: {
        position: 'relative',
        width: "100%",
        // borderBo: "1px solid #294B98",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    containerIntroItems2: {
        position: 'relative',
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        borderBottom: 'none'
    },
    introItems: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        width: "100%",
        borderLeft: "1px solid #294B98",
        borderRight: "1px solid #294B98",
    },
    introItems2: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        width: "100%",
        border: "1px solid #294B98",
    },
    introImg: {
        width: "100%",
        height: "100px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    logo: {
        position: "relative",
        height: "auto",
        width: "150px",
        marginLeft: "35px",
    },
    introView0: {
        position: "relative",
        width: "100%",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        justifyContent: 'stretch',
        // border: '1px solid #294B98'
    },
    introView: {
        width: "100%",
        padding: "10px",
        border: '1px solid #294B98'
    },
    introView2: {
        display: 'flex',
        flexDirection: 'row',
        width: "100%",

    },
    introText: {
        width: '100%',
        minHeight: '13px',
        padding: '2px 0'
    },
    items: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap"
    },
    // introView: {
    //     width: "100%",
    //     display: "flex",
    //     flexDirection: "row"
    // },
    viewKeyValue: {
        width: "100%",
        display: "flex",
        flexDirection: "row"
    },

    key: {
        margin: "0px",
        width: "50%",
        padding: "2px 5px 0px 5px ",
        border: "1px solid #294B98",
        backgroundColor: "#294B98",
        color: "#f2f2f2",
        fontSize: "8px",
        fontWeight: "100"

    },
    value: {
        margin: "0px",
        width: "100%",
        minHeight: '13px',
        padding: "2px 5px 0px 5px ",
        fontSize: "8px",
        fontWeight: "100",
        wordBreak: 'break-all',
        wordWrap: 'break-word',
        textOverflow: 'clip',
        border: "1px solid #294B98",

    },
    valueTwo: {
        margin: "0px",
        width: "100%",
        minHeight: '50px',
        padding: "2px 5px 0px 5px ",
        border: "1px solid #294B98",
        fontSize: "8px",
        fontWeight: "100",
        wordBreak: 'break-all',
        wordWrap: 'break-word',
        textOverflow: 'clip',
    },
    valueBorder: {
        margin: "0px",
        width: "100%",
        minHeight: '13px',
        padding: "2px 5px 0px 5px ",
        border: "1px solid #294B98",
        fontSize: "8px",
        fontWeight: "100",
        wordBreak: 'break-all',
        wordWrap: 'break-word',
        textOverflow: 'clip',
        border: "1px solid #294B98",

    },
    valueFull: {
        margin: "0px",
        width: "100%",
        minHeight: '7%',
        padding: "2px 5px 0px 5px ",
        border: "none",
        fontSize: "8px",
        fontWeight: "100",
        wordBreak: 'break-all',
        wordWrap: 'break-word',
        textOverflow: 'clip',
    },
    valueFull2: {
        margin: "0px",
        width: "100%",
        minHeight: '20%',
        padding: "2px 5px 0px 5px ",
        border: "none",
        fontSize: "8px",
        fontWeight: "100",
        wordBreak: 'break-all',
        wordWrap: 'break-word',
        textOverflow: 'clip',
    },
    noValue: {
        width: "100%",
        height: "12px",
        padding: "2px 5px 0px 5px ",
        border: "0.5px solid #294B98",
        color: "#ffffff",
        fontSize: "8px",
        fontWeight: "100",
        backgroundColor: "#294B98",

    },
    valueYellow: {
        width: "25%",
        height: "12px",
        padding: "2px 5px 0px 5px ",
        border: "0.5px solid orange",
        color: "orange",
        fontSize: "8px",
        fontWeight: "100"

    },

    valueElaborador: {
        width: "33%",
        height: "12px",
        padding: "2px 5px 0px 5px ",
        color: "#000000",
        fontSize: "8px",
        fontWeight: "100",
        textAlign: "right",
        backgroundColor: "transparent",
    },
    valueElaboradorLine: {
        width: "34%",
        height: "12px",
        padding: "2px 5px 0px 5px ",
        borderTop: "1px solid #294B98",
        color: "#000000",
        fontSize: "8px",
        fontWeight: "100",
        textAlign: "center",
        backgroundColor: "transparent",
    },
    noValueYellow: {
        width: "25%",
        height: "12px",
        padding: "2px 5px 0px 5px ",
        border: "0.5px solid orange",
        color: "#ffffff",
        fontSize: "8px",
        fontWeight: "100",
        backgroundColor: "orange",

    },
    viewKeyValueTwo: {
        width: "100%",
        display: "flex",
        flexDirection: "row"
    },
    viewKeyValueTwoYellow: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        margin: "16px 0 0 0",
    },

    viewKeyValueElaborado: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        margin: "30px 0 0 0",
    },



})






const PDFView = ({ click }) => {
    const { pdfData, setUserPdfData } = useUser()

    const [isCliente, setisCliente] = useState(false);

    const Br = () => "\n";

    useEffect(() => {
        setisCliente(true)
        setUserPdfData({ tarifa: [''], otrosGastos: [''], incluye: [''], excluye: [''], notas: [''], ...pdfData })
    }, []);

    console.log(pdfData)

    return (
        <div style={{ display: 'block', width: '100vw', textAlign: 'center', zIndex: '50' }}>
            {isCliente && <PDFDownloadLink document={
                <Document style={{ width: '100vw', }}>
                    <Page style={styles.body} size="A4" fixed  >

                        <View style={styles.container}>
                            <View style={styles.containerIntroItems}>
                                <View style={styles.introItems}>
                                    <View style={styles.introImg}>
                                        <Image style={styles.logo} src="/logo-horizontal.png" />
                                    </View>
                                    <View style={styles.introView0}>
                                        <Text style={styles.subtitle}>SHIPPER</Text>
                                        <Text style={styles.valueFull}></Text>
                                    </View>
                                </View>
                                <View style={styles.introItems}>
                                    <View style={styles.introView}>
                                        <Text style={styles.title}>BILL OF LADING</Text>
                                    </View>
                                    <View style={styles.introView}>
                                        <Text style={styles.introText}>(H)BL No.:</Text>
                                        <Text style={styles.introText}>(M)BL No.:</Text>
                                    </View>
                                    <View style={styles.introView}>
                                        <Text style={styles.introText}>Booking:</Text>
                                    </View>
                                    <View style={styles.introView}>
                                        <Text style={styles.introText}>Export Reference:</Text>
                                    </View>
                                    <View style={styles.introView2}>
                                        <View style={styles.introView}>
                                            <Text style={styles.introText}>Carga refrigerada:</Text>
                                            <Text style={styles.introText}>Temperatura °C:</Text>
                                            <Text style={styles.introText}>Ventilación (cbm/h):</Text>
                                            <Text style={styles.introText}>Deshumificacion:</Text>
                                        </View>
                                        <View style={styles.introView}>
                                            <Text style={styles.introText}>Craga Peligrosa:</Text>
                                            <Text style={styles.introText}>IMO No:</Text>
                                            <Text style={styles.introText}>UN #:</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.containerIntroItems}>

                                <View style={styles.introItems}>
                                    <View style={styles.introView0}>
                                        <Text style={styles.subtitle}>CONSIGNE</Text>
                                        <Text style={styles.valueFull}>{pdfData && pdfData["nombre"] && pdfData["nombre"]}</Text>
                                    </View>
                                </View>
                                <View style={styles.introItems}>
                                    <View style={styles.introView0}>
                                        <Text style={styles.subtitle}>NOTIFY PARTY</Text>
                                        <Text style={styles.valueFull}>{pdfData && pdfData["nombre"] && pdfData["nombre"]}</Text>
                                    </View>
                                    <View style={styles.introView0}>
                                        <Text style={styles.subtitle}>FORWARDING AGENT</Text>
                                        <Text style={styles.valueFull}>{pdfData && pdfData["nombre"] && pdfData["nombre"]}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.containerIntroItems}>
                                <View style={styles.containerIntroItems}>
                                    <View style={styles.introItems}>
                                        <Text style={styles.subtitle2}>PRECARRIAGE BY</Text>
                                        <Text style={styles.introText}>fgdfgdfg <Br /></Text>
                                    </View>

                                    <View style={styles.introItems}>
                                        <Text style={styles.subtitle2}>PLACE OF RECEIPT BY PRE CARRIER</Text>
                                        <Text style={styles.introText}>{pdfData && pdfData["nombre"] && pdfData["nombre"]}</Text>
                                    </View>
                                </View>
                                <View style={styles.containerIntroItems}>
                                    <View style={styles.introItems}>
                                        <Text style={styles.subtitle2}>DOMESTICS ROUTING EXPORT INSTRUCTIONS/ ALSO NOTIFY/ AGENT AT PORT OF DISCHARGE</Text>
                                        <Text style={styles.introText}>{pdfData && pdfData["nombre"] && pdfData["nombre"]}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.containerIntroItems}>

                                <View style={styles.introItems}>
                                    <Text style={styles.subtitle}>VESSEL</Text>
                                    <Text style={styles.introText}>{pdfData && pdfData["nombre"] && pdfData["nombre"]}</Text>
                                </View>
                                <View style={styles.introItems}>
                                    <Text style={styles.subtitle}>VOYAGE No.</Text>
                                    <Text style={styles.introText}>{pdfData && pdfData["nombre"] && pdfData["nombre"]}</Text>
                                </View>
                                <View style={styles.introItems}>
                                    <Text style={styles.subtitle}>POINT AND COUNTRY OF ORIGIN</Text>
                                    <Text style={styles.introText}>{pdfData && pdfData["nombre"] && pdfData["nombre"]}</Text>
                                </View>
                                <View style={styles.introItems}>
                                    <Text style={styles.subtitle}>LOADING PIER/TERMINAL</Text>
                                    <Text style={styles.introText}>{pdfData && pdfData["nombre"] && pdfData["nombre"]}</Text>
                                </View>
                            </View>
                            <View style={styles.containerIntroItems}>

                                <View style={styles.introItems}>
                                    <Text style={styles.subtitle}>PORT OF LOADING</Text>
                                    <Text style={styles.introText}>{pdfData && pdfData["nombre"] && pdfData["nombre"]}</Text>
                                </View>
                                <View style={styles.introItems}>
                                    <Text style={styles.subtitle}>PORT OF DISCHARGE</Text>
                                    <Text style={styles.introText}>{pdfData && pdfData["nombre"] && pdfData["nombre"]}</Text>
                                </View>
                                <View style={styles.introItems}>
                                    <Text style={styles.subtitle2}>PLACE OF DELIVERY BY ON CARRIER</Text>
                                    <Text style={styles.introText}>{pdfData && pdfData["nombre"] && pdfData["nombre"]}</Text>
                                </View>
                                <View style={styles.introItems}>
                                    <Text style={styles.subtitle}>TYPE OF MOVE</Text>
                                    <Text style={styles.introText}>{pdfData && pdfData["nombre"] && pdfData["nombre"]}</Text>
                                </View>
                            </View>
                            <View style={styles.containerIntroItems}>
                                <View style={styles.introItems}>
                                    <Text style={styles.subtitle}>Marsk and Nos <Br /> Container/ Seal No.</Text>
                                    <Text style={styles.valueFull2}>{pdfData && pdfData["nombre"] && pdfData["nombre"]}</Text>
                                </View>
                                <View style={styles.introItems}>
                                    <Text style={styles.subtitle}>No. Of Container <Br /> or packages</Text>
                                    <Text style={styles.valueFull2}>{pdfData && pdfData["nombre"] && pdfData["nombre"]}</Text>
                                </View>
                                <View style={styles.introItems}>
                                    <Text style={styles.subtitle}>DESCRIPTIONS OF GOODS <Br /> </Text>
                                    <Text style={styles.valueFull2}>{pdfData && pdfData["nombre"] && pdfData["nombre"]}</Text>
                                </View>
                                <View style={styles.introItems}>
                                    <Text style={styles.subtitle}>GROSS <Br /> WEIGHT KG</Text>
                                    <Text style={styles.valueFull2}>{pdfData && pdfData["nombre"] && pdfData["nombre"]}</Text>
                                </View>
                                <View style={styles.introItems}>
                                    <Text style={styles.subtitle}>MEASUREMENT <Br /> CBM</Text>
                                    <Text style={styles.valueFull2}>{pdfData && pdfData["nombre"] && pdfData["nombre"]}</Text>
                                </View>
                            </View>

                            <View style={styles.containerIntroItems}>
                                <View style={styles.introItems}>
                                    <Text style={styles.subtitle}> </Text>
                                </View>
                                <View style={styles.introItems}>
                                    <Text style={styles.subtitle}>  </Text>
                                </View>
                                <View style={styles.introItems}>
                                    <Text style={styles.subtitle}>TOTAL </Text>
                                </View>
                                <View style={styles.introItems}>
                                    <Text style={styles.subtitle}>  </Text>
                                </View>
                                <View style={styles.introItems}>
                                    <Text style={styles.subtitle}>  </Text>
                                </View>
                            </View>
                            <View style={styles.containerIntroItems}>
                                <View style={styles.introItems}>
                                    <View style={styles.introView2}>
                                        <Text style={styles.subtitle2}>FREIGHT RATES, CHARGES, WHEIGHTS AND OR MEAUSUREMENTS</Text>
                                    </View>
                                    <View style={styles.introView2}>
                                        <View style={styles.introItems}>
                                            <Text style={styles.subtitle}>CHARGE</Text>
                                            <Text style={styles.valueFull2}>{pdfData && pdfData["nombre"] && pdfData["nombre"]}</Text>
                                        </View>

                                        <View style={styles.introItems}>
                                            <Text style={styles.subtitle}>PREPAID</Text>
                                            <Text style={styles.valueFull2}>{pdfData && pdfData["nombre"] && pdfData["nombre"]}</Text>
                                        </View>

                                        <View style={styles.introItems}>
                                            <Text style={styles.subtitle}>COLLET</Text>
                                            <Text style={styles.valueFull2}>{pdfData && pdfData["nombre"] && pdfData["nombre"]}</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.introItems}>
                                    <View style={styles.introItems}>
                                        <View style={styles.introItems2}>
                                            <Text style={styles.valueFull}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquam consectetur omnis veritatis voluptas nobis quae, ab cupiditate animi commodi amet in labore dolore ex minus enim ipsa repellendus et ut? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquam consectetur omnis veritatis voluptas nobis quae, ab cupiditate animi commodi amet in labore dolore ex minus enim ipsa repellendus et ut?</Text>
                                        </View>
                                        <View style={styles.introView2}>
                                            <View style={styles.introItems2}>
                                                <Text style={styles.subtitle}>Number and secuence <Br> Original B/L</Br></Text>
                                                <Text style={styles.introText}>{pdfData && pdfData["nombre"] && pdfData["nombre"]}</Text>
                                            </View>

                                            <View style={styles.introItems2}>
                                                <Text style={styles.subtitle}>Place of issue of B/L</Text>
                                                <Text style={styles.introText}>{pdfData && pdfData["nombre"] && pdfData["nombre"]}</Text>
                                            </View>

                                            <View style={styles.introItems2}>
                                                <Text style={styles.subtitle}>Date of issue ok B/L</Text>
                                                <Text style={styles.introText}>{pdfData && pdfData["nombre"] && pdfData["nombre"]}</Text>
                                            </View>

                                            <View style={styles.introItems2}>
                                                <Text style={styles.subtitle}>Shipped onBoard Date</Text>
                                                <Text style={styles.introText}>{pdfData && pdfData["nombre"] && pdfData["nombre"]}</Text>
                                            </View>

                                            <View style={styles.introItems2}>
                                                <Text style={styles.subtitle}>Declared Value</Text>
                                                <Text style={styles.introText}>{pdfData && pdfData["nombre"] && pdfData["nombre"]}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>

                    </Page>
                </Document>
            }
                fileName={`BILL OF LADING`}>

                <Button theme='Primary' click={click}>pdf</Button>

            </PDFDownloadLink>}
        </div>
    )
}


export default PDFView