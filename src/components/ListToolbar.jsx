import { ActivityIndicator, TextInput } from "react-native";
import { useVeterinaria } from "../context/VeterinariaContext";
import { styles } from "../styles/common";
import Button from "./Button";
export default function ListToolbar({
    search,
    setSearch,
    kind,
    canCreate = true,
}) {
    const { loading, busy, refresh, openForm } = useVeterinaria();
    return (
        <>
            {loading && <ActivityIndicator />}
            <Button
                title="Actualizar datos"
                onPress={refresh}
                disabled={loading || busy}
            />
            <TextInput
                accessibilityLabel="Buscar por nombre"
                placeholder="Buscar por nombre"
                value={search}
                onChangeText={setSearch}
                style={styles.input}
            />
            {canCreate && (
                <Button
                    title={kind === "clientes" ? "Nuevo cliente" : "Nueva mascota"}
                    onPress={() => openForm(kind)}
                    disabled={loading || busy}
                />
            )}
        </>
    );
}