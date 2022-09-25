import { object, string, ref } from 'yup';

let validations = object({
  name: string().min(2, "Adınız en az 2 harften oluşmalıdır").required("Zorunlu alan"),
  email: string().email("Lütfen geçerli bir mail adresi giriniz").required("Zorunlu alan"),
  password: string().min(8, "Parolanız en az 8 karakterden oluşmalıdır").required("Zorunlu alan"),
  // confirmPassword: string().oneOf([ref("password")], "Parolalar eşleşmiyor.").required("Zorunlu alan")
});

export default validations;