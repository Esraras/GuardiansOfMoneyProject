import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { registerSchema } from "../../schemas/schemas";

import AuthForm from "../../components/AuthForm/AuthForm";
import { registerThunk } from "../../redux/auth/operations";

const initialValues = {
    username: "",
    password: "",
    email: "",
    confirmPassword: "",
};

const RegistrationPage = () => {
    const dispatch = useDispatch();

    const handleSubmit = ({ username, email, password }, { resetForm }) => {
        dispatch(registerThunk({ username, email, password }))
            .unwrap()
            .then((data) => {
                toast.success(
                    `Registration is success ${data.user.username}, welcome!`
                );
            })
            .catch((err) => {
                const message = err || "Invalid credentials";
                toast.error(message);
            });

        resetForm();
    };

    return (
        <AuthForm
            type="register"
            title="Registration"
            onSubmit={handleSubmit}
            validationSchema={registerSchema}
            initialValues={initialValues}
        />
    );
};

export default RegistrationPage;
