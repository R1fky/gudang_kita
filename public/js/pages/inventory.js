document.getElementById("formTambahBarang").addEventListener("submit", async (e) => {
  try {
    e.preventDefault();

    const data = {
      namaBarang: document.getElementById("namaBarang").value,
      kategoriBarang: document.getElementById("kategoriBarang").value,
      stokBarang: document.getElementById("stokBarang").value,
      satuanBarang: document.getElementById("satuanBarang").value,
      hargaBarang: document.getElementById("hargaBarang").value,
    };

    const response = await fetch("/inventory/add-barang", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (result.success) {
      alert(result.message);
      document.getElementById("formTambahBarang").reset();
      // Tutup modal otomatis
      const modal = bootstrap.Modal.getInstance(document.getElementById("tambahBarangModal"));
      modal.hide();
      // (Opsional) reload tabel data
      location.reload();
    } else {
      alert(result.message);
    }
  } catch (error) {
    console.error("Terjadi kesalahan:", error);
    alert("Terjadi kesalahan saat menambahkan barang.");
  }
});
