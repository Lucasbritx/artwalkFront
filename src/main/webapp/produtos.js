const deleteProduct = (id) => {
  $.ajax({
    url: `http://localhost:8080/trabalhoartwalk/resources/produtos/${id}`,
    method: "DELETE",
    success: function (response) {
      window.location.reload();
    },
  });
};

$(document).ready(function () {
  $.ajax({
    url: "http://localhost:8080/trabalhoartwalk/resources/produtos",
    method: "GET",
    success: function (response) {
      $("#lista-produtos").DataTable({
        data: response,
        language: {
          url: "//cdn.datatables.net/plug-ins/1.10.25/i18n/Portuguese-Brasil.json",
        },
        paging: false,
        filter: false,
        info: false,
        columns: [
          { data: "id" },
          { data: "nome" },
          { data: "precoUnitario" },
          { data: "descricao" },
          { data: "unidade" },
          { data: "acoes" },
        ],
        columnDefs: [
          {
            targets: 5,
            data: "acoes",
            render: function (data, type, row, meta) {
              return (
                '<div class="flex flex-row gap-2">' +
                '<button class="font-bold py-2 px-4 rounded bg-blue-500 text-white hover:bg-blue-700">Editar</button>' +
                `<button onclick="deleteProduct(${row.id})" class="font-bold py-2 px-4 rounded bg-red-500 text-white hover:bg-red-700">Excluir</button>` +
                "</div>"
              );
            },
          },
        ],
      });
    },
  });
});
