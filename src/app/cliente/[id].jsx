import { router, useLocalSearchParams } from "expo-router";
import { ActivityIndicator, Text } from "react-native";
import { photoUrl } from "../../api";
import Button from "../../components/Button";
import PetCard from "../../components/PetCard";
import RecordPhoto from "../../components/RecordPhoto";
import { useVeterinaria } from "../../context/VeterinariaContext";
import { useProtectedRoute } from "../../hooks/useProtectedRoute";
import { styles } from "../../styles/common";
export default function DetalleCliente() {
    const access = useProtectedRoute();
    const { id } = useLocalSearchParams();
    const { clientes, mascotas, loading } = useVeterinaria();
    const detail = clientes.find((c) => String(c.id) === String(id));
    if (access) return access;
    if (!detail)
        return loading ? (
            <ActivityIndicator />
        ) : (
            <>
                <Text>Cliente no encontrado</Text>
                <Button title="Volver" onPress={() => router.replace("/clientes")} />
            </>
        );
    const visiblePets = mascotas.filter(
        (m) => String(m.clientesId) === String(detail.id),
    );
    return (
        <>
            <Button title="Volver a clientes" onPress={() => router.back()} />
            <RecordPhoto
                key={detail.foto || "sin-foto"}
                uri={photoUrl(detail.foto, "clientes")}
                label={"Foto de " + detail.nombre}
            />
            <Text style={styles.subtitle}>
                {detail.nombre} {detail.apellido}
            </Text>
            <Text>
                {detail.telefono} · {detail.email}
            </Text>
            <Text>
                {detail.direccion} · {detail.localidad}
            </Text>
            <Text>Mascotas ({visiblePets.length})</Text>
            {visiblePets.map((m) => (
                <PetCard key={m.id} mascota={m} />
            ))}
            {!visiblePets.length && (
                <Text>Este cliente no tiene mascotas registradas.</Text>
            )}
        </>
    );
}