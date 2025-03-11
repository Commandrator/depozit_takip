import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Input,
  Typography,
  IconButton,
} from "@mui/material";
import useCompany from "../../hooks/useCompany";
import {
  Close,
  DeleteForever,
  Edit as EditIcon,
  Save,
} from "@mui/icons-material";
import { CompanyDTO } from "../../interfaces/CompanyDTO";

const CompanyDialog = ({
  dialogOpen,
  handleDialogAction,
  selectedCompanyId,
  dialogType,
}: any) => {
  const { getCompanyDetail, change, setChange } = useCompany();
  const [company, setCompany] = useState<CompanyDTO>();

  useEffect(() => {
    // Güncellem durumunu kontrol etmek için yadığım change ksımı düzenlemede çalışmayıp silmede çalışıyor.
    const loader = async () => {
      const data = await getCompanyDetail(selectedCompanyId);
      if (data) {
        setCompany(data);
        if (change) setChange(false); // Değişim durumunu false yapıyoruz
      }
    };
    if (selectedCompanyId) loader();
  }, [getCompanyDetail, selectedCompanyId, change, setChange]);

  if (company)
    switch (dialogType) {
      case "info":
        return (
          <Info
            dialogOpen={dialogOpen}
            handleDialogAction={handleDialogAction}
            company={company}
            selectedCompanyId={selectedCompanyId}
          />
        );
      case "edit":
        return (
          <Edit
            dialogOpen={dialogOpen}
            handleDialogAction={handleDialogAction}
            company={company}
            selectedCompanyId={selectedCompanyId}
          />
        );
      case "delete":
        return (
          <Delete
            dialogOpen={dialogOpen}
            handleDialogAction={handleDialogAction}
            company={company}
            selectedCompanyId={selectedCompanyId}
          />
        );
      default:
        return null;
    }
  else return null;
};

const Info = ({
  dialogOpen,
  handleDialogAction,
  selectedCompanyId,
  company,
}: any) => {
  return (
    <Dialog
      open={dialogOpen}
      onClose={handleDialogAction}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle>
        {company.name}
        <hr />
        <Typography color="GrayText">{company.about}</Typography>
      </DialogTitle>
      <DialogContent>
        <div className="bg-gray-300 px-5 py-3 rounded-xl">
          <ContentItem title="Sorumlu" content={company.responsible.username} />
          <ContentItem
            title="Sorumlu Kimliği"
            content={company.responsible.id}
          />
          <ContentItem title="Mail" content={company.responsible.email} />
          <ContentItem
            title="Telefon Numarası"
            content={company.responsible.phone_number}
          />
          <ContentItem title="Adress" content={company.responsible.address} />
          <hr className="my-2 border border-gray-700" />
          <ContentItem title="Şirket Numarası" content={selectedCompanyId} />
          <ContentItem
            title="Oluşturma Tarihi"
            content={new Date(company.responsible.created_at).toLocaleString()}
          />
          <ContentItem
            title="Son Güncelleştirme Tarihi"
            content={new Date(company.responsible.updated_at).toLocaleString()}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          endIcon={<Close />}
          color="error"
          variant="contained"
          sx={{
            mb: 2,
            mr: 2,
          }}
          onClick={handleDialogAction}
        >
          Kapat
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const ContentItem = ({ title, content }) => {
  if (content)
    return (
      <Typography component="h1">
        <b>{title}</b>: {content}
      </Typography>
    );
  else return null;
};

const InputContent = ({
  defultValue,
  title,
  placeholder,
  type,
  selectedCompanyId,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState<string>(defultValue);
  const { updateCompany } = useCompany();
  const handleEditToggle = () => {
    if (isEditing) {
      setValue(defultValue);
    }
    setIsEditing(!isEditing);
  };
  const handleInputChange = (e) => {
    setValue(e.target.value);
  };
  const saveChanges = async (e) => {
    e.preventDefault();
    await updateCompany(selectedCompanyId, { [type]: value });
    setIsEditing(false);
  };

  const cancelChanges = () => {
    setValue(defultValue);
    setIsEditing(false);
  };
  return (
    <div className="flex items-end justify-between">
      <form onSubmit={saveChanges} className="flex flex-col w-full">
        <label className="mr-2 font-bold">{title}</label>
        <Input
          title="Şirket Adı"
          value={value}
          placeholder={placeholder}
          type="text"
          disabled={!isEditing}
          onChange={handleInputChange}
          style={{ flex: 1 }}
        />
      </form>
      <IconButton onClick={isEditing ? cancelChanges : handleEditToggle}>
        {isEditing ? <Close /> : <EditIcon />}
      </IconButton>
      <IconButton
        onClick={saveChanges}
        disabled={!(isEditing && value !== defultValue)}
      >
        <Save />
      </IconButton>
    </div>
  );
};

const Edit = ({
  dialogOpen,
  handleDialogAction,
  selectedCompanyId,
  company,
}: any) => {
  return (
    <Dialog
      open={dialogOpen}
      onClose={handleDialogAction}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle>Şirket Bilgilerini Düzenle</DialogTitle>
      <DialogContent className="space-y-2">
        <InputContent
          title="Adı"
          defultValue={company.name}
          placeholder="Yaşaroğlu Ticaret"
          type="name"
          selectedCompanyId={selectedCompanyId}
        />
        <InputContent
          title="Hakkında"
          defultValue={company.about}
          placeholder="'Firma Adı' B2B Depozito Takibi"
          type="about"
          selectedCompanyId={selectedCompanyId}
        />
      </DialogContent>
      <DialogContent>
        <div className="bg-gray-300 px-5 py-3 rounded-xl">
          <ContentItem title="Sorumlu" content={company.responsible.username} />
          <ContentItem
            title="Sorumlu Kimliği"
            content={company.responsible.id}
          />
          <ContentItem title="Mail" content={company.responsible.email} />
          <ContentItem
            title="Telefon Numarası"
            content={company.responsible.phone_number}
          />
          <ContentItem title="Adress" content={company.responsible.address} />
          <hr className="my-2 border border-gray-700" />
          <ContentItem title="Şirket Numarası" content={selectedCompanyId} />
          <ContentItem
            title="Oluşturma Tarihi"
            content={new Date(company.responsible.created_at).toLocaleString()}
          />
          <ContentItem
            title="Son Güncelleştirme Tarihi"
            content={new Date(company.responsible.updated_at).toLocaleString()}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          endIcon={<Close />}
          color="error"
          variant="contained"
          onClick={handleDialogAction}
        >
          Kapat
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const Delete = ({
  dialogOpen,
  handleDialogAction,
  selectedCompanyId,
  company,
}: any) => {
  const { deleteCompany } = useCompany();
  const handleDelete = async () => {
    await deleteCompany(selectedCompanyId);
  };
  return (
    <Dialog
      open={dialogOpen}
      onClose={handleDialogAction}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle>
        {company.name}
        <hr />
        <Typography color="GrayText">{company.about}</Typography>
      </DialogTitle>
      <DialogContent>
        <div className="bg-gray-300 px-5 py-3 rounded-xl">
          <ContentItem title="Sorumlu" content={company.responsible.username} />
          <ContentItem
            title="Sorumlu Kimliği"
            content={company.responsible.id}
          />
          <ContentItem title="Mail" content={company.responsible.email} />
          <ContentItem
            title="Telefon Numarası"
            content={company.responsible.phone_number}
          />
          <ContentItem title="Adress" content={company.responsible.address} />
          <hr className="my-2 border border-gray-700" />
          <ContentItem title="Şirket Numarası" content={selectedCompanyId} />
          <ContentItem
            title="Oluşturma Tarihi"
            content={new Date(company.responsible.created_at).toLocaleString()}
          />
          <ContentItem
            title="Son Güncelleştirme Tarihi"
            content={new Date(company.responsible.updated_at).toLocaleString()}
          />
        </div>
        <br />
        Şirketinize ait bilgileri silmek üzeresiniz. İşlemi onaylamak için
        lütfen "Sil" butonuna tıklayın.
      </DialogContent>
      <DialogActions>
        <Button
          endIcon={<DeleteForever />}
          variant="contained"
          onClick={handleDelete}
        >
          Sil
        </Button>
        <Button
          endIcon={<Close />}
          color="error"
          variant="contained"
          onClick={handleDialogAction}
        >
          Kapat
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CompanyDialog;
