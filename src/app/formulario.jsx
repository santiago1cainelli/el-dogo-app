import { Redirect, router } from "expo-router";
import { Text, View } from "react-native";
import Button from "../components/Button";
import FormularioCliente from "../components/FormularioCliente";
import FormularioMascota from "../components/FormularioMascota";
import PhotoPicker from "../components/PhotoPicker";
import { useVeterinaria } from "../context/VeterinariaContext";
import { useProtectedRoute } from "../hooks/useProtectedRoute";
import { styles } from "../styles/common";
export default function Formulario() {
    const access = useProtectedRoute();
    const { form, busy, save } = useVeterinaria();
    if (access) return access;
    if (!form) return <Redirect href="/clientes" />;
    return (
        <View style={styles.card}>
            <Text style={styles.subtitle}>
                {form.id ? "Editar" : "Registrar"}{" "}
                {form.kind === "clientes" ? "cliente" : "mascota"}
            </Text>
            <Text>
                Foto, raza e historia clínica son opcionales. Los demás campos son
                obligatorios.
            </Text>
            <PhotoPicker />
            {form.kind === "clientes" ? <FormularioCliente /> : <FormularioMascota />}
            <Button
                title={busy ? "Guardando..." : "Guardar"}
                onPress={save}
                disabled={busy}
            />
            <Button title="Cancelar" onPress={() => router.back()} disabled={busy} />
        </View>
    );
}