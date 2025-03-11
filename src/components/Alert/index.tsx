import React from "react";
import CloseIcon  from '@mui/icons-material/Close';
import {Snackbar, AlertTitle, Alert, IconButton} from '@mui/material'
import AlertDTO from "../../interfaces/Alert.dto";
import DetailDTO from "../../interfaces/alert.detil.dto";
const defaultDetil: DetailDTO = {
    severity:"success",
    variant:"standard",
    message:"",
    title:""
};
/**
 * # GlobalAlert
 * ---
 * _Uygulama içi durum bildirilerini kullanıcıya iletmesi için oluşturulmuştur._
 * * open, boolean veritipnde olup diyalogun aktiflik durumu için kullanılır. **true** ise aktif **false** ise deaktif durumda olduğu anlamına gelir. 
 * * setOpen, dialoğun aktiflik durumunu değiştirmede kullanılır. Yalnızca boolean veritipi ile çalışır.
 * * detail, dialog yapılandırma verilerini içermektedir.
 *      * severity, Alert durum icon bilgisini barındırır.
 *      * variant, Alert tipi için kullanılırt.
 *      * message, Alert Mesajıdır.
 *      * title, Alert başlıkğıdır
 * * setDetail, DetailDTO verilerine göre yapılandırılmış olup detail yapılandırması için kullanılır.
 * @param props 
 * @returns 
 */
const GlobalAlert = (props) => {
    const {open, setOpen, setDetail, detail = defaultDetil}:AlertDTO=props
    const handleClose = () => {
        setOpen(false); //Alerti kapatma fonksiyonu
    };
    return(
        <Snackbar
            open={open}
            onClose={handleClose}
            autoHideDuration={6000} //6 saniye içerisinde otomatik olarak gizlicek
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
            <Alert
                severity={detail.severity}
                variant={detail.variant}
                action={
                    <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                        setDetail(defaultDetil);
                        setOpen(false);
                    }}
                    >
                    <CloseIcon fontSize="inherit" />
                    </IconButton>
                }
                sx={{ mb: 2 }}>
                    <AlertTitle>{detail.title}</AlertTitle>
                    {detail.message}
            </Alert>
        </Snackbar>
    )
}
export {GlobalAlert};