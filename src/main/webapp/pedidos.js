const deletePedido = (numero) => {
  $.ajax({
    url: `http://localhost:8080/trabalhoartwalk/resources/pedidos/${numero}`,
    method: "DELETE",
    success: function (response) {
      window.alert("Pedido excluído com sucesso!");
      window.location.reload();
    },
  });
};

$(document).ready(function () {
  $.ajax({
    url: "http://localhost:8080/trabalhoartwalk/resources/pedidos",
    method: "GET",
    success: function (response) {
      $("#lista-pedidos").DataTable({
        data: response,
        language: {
          url: "//cdn.datatables.net/plug-ins/1.10.25/i18n/Portuguese-Brasil.json",
        },
        paging: false,
        filter: false,
        info: false,
        columns: [
          { data: "numero" },
          { data: "dataEmissao" },
          { data: "valorFrete" },
          {
            data: "dataEntrega",
            render: function (data, type, row, meta) {
              return data ? data : "Pendente";
            },
          },
          { data: "clientesId" },
          { data: "acoes" },
        ],
        columnDefs: [
          {
            targets: -1,
            data: "acoes",
            render: function (data, type, row, meta) {
              return (
                '<div class="flex flex-row gap-2">' +
                '<button class="font-bold py-2 px-4 rounded bg-blue-500 text-white hover:bg-blue-700">Editar</button>' +
                `<button onclick="deletePedido(${row.numero})" class="font-bold py-2 px-4 rounded bg-red-500 text-white hover:bg-red-700">Excluir</button>` +
                "</div>"
              );
            },
          },
        ],
      });
    },
  });
});
