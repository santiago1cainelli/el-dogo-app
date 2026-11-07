import { Text } from "react-native";
import { PET_FIELDS } from "../constants/fields";
import { useVeterinaria } from "../context/VeterinariaContext";
import { styles } from "../styles/common";
import Button from "./Button";
import Field from "./Field";
export default function FormularioMascota() {
    const { form, setForm, clientes } = useVeterinaria();
    return (
        <>
            {PET_FIELDS.map((name) => (
                <Field
                    key={name}
                    name={name}
                    value={form.values[name]}
                    onChange={(value) =>
                        setForm((current) => ({
                            ...current,
                            values: { ...current.values, [name]: value },
                        }))
                    }
                />
            ))}{" "}
            {form.kind === "mascotas" && (
                <>
                    <Text style={styles.label}>Dueño</Text>
                    {clientes.map((c) => (
                        <Button
                            key={c.id}
                            title={
                                (String(c.id) === form.values.clientesId ? "✓ " : "") +
                                c.nombre +
                                " " +
                                (c.apellido || "")
                            }
                            onPress={() =>
                                setForm((f) => ({
                                    ...f,
                                    values: { ...f.values, clientesId: String(c.id) },
                                }))
                            }
                        />
                    ))}
                    {!clientes.length && <Text>Primero registrá un cliente.</Text>}
                </>
            )}
        </>
    );
}