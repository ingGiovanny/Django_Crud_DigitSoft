// Datos de ejemplo (en un sistema real, estos vendrían de una base de datos)
       let providers = [
            {
                id: '1',
                name: 'Servicio Técnico Ejemplo 1',
                idNumber: '123456789',
                nit: '901234567-8',
                address: 'Juan@gmail.com',
                phone: 'Hp'
            },
            {
                id: '2',
                name: 'Servicio Técnico Ejemplo 2',
                idNumber: '1234567890',
                nit: '876543210-9',
                address: 'Luis@hotmail.com',
                phone: 'Asus'
            }
        ];
    

        // Variable para controlar si estamos editando
        let editingProviderId = null;

        // Al cargar la página
        document.addEventListener('DOMContentLoaded', function() {
            renderProvidersTable();
            
            // Configurar el formulario
            document.getElementById('provider-form').addEventListener('submit', function(e) {
                e.preventDefault();
                saveProvider();
            });
        });

        // Mostrar el formulario para agregar
        function showAddForm() {
            document.getElementById('list-section').classList.add('hidden');
            document.getElementById('form-section').classList.remove('hidden');
            document.getElementById('form-title').textContent = 'Agregar Garantía';
            document.getElementById('provider-form').reset();
            editingProviderId = null;
        }

        // Cancelar el formulario
        function cancelForm() {
            document.getElementById('list-section').classList.remove('hidden');
            document.getElementById('form-section').classList.add('hidden');
            document.getElementById('provider-form').reset();
            editingProviderId = null;
        }

        // Renderizar la tabla de Garantía
        function renderProvidersTable(providersToRender = providers) {
            const tableBody = document.getElementById('providers-table');
            tableBody.innerHTML = '';

            if (providersToRender.length === 0) {
                tableBody.innerHTML = '<tr><td colspan="6" style="text-align: center;">No hay Garantías registradas</td></tr>';
                return;
            }

            providersToRender.forEach(provider => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${provider.name}</td>
                    <td>${provider.idNumber}</td>
                    <td>${provider.nit}</td>
                    <td>${provider.address}</td>
                    <td>${provider.phone}</td>
                    <td class="action-buttons">
                        <button class="btn btn-primary" onclick="editProvider('${provider.id}')">Editar</button>
                        <button class="btn btn-danger" onclick="deleteProvider('${provider.id}')">Eliminar</button>
                    </td>
                `;
                tableBody.appendChild(row);
            });
        }

        // Buscar Grantías
        function searchProviders() {
            const searchTerm = document.getElementById('search-input').value.toLowerCase();
            
            if (!searchTerm) {
                renderProvidersTable();
                return;
            }
            
            const filteredProviders = providers.filter(provider => 
                provider.name.toLowerCase().includes(searchTerm) ||
                provider.idNumber.toLowerCase().includes(searchTerm) ||
                provider.nit.toLowerCase().includes(searchTerm) ||
                provider.phone.toLowerCase().includes(searchTerm) ||
                provider.address.toLowerCase().includes(searchTerm)
            );
            
            renderProvidersTable(filteredProviders);
        }

        // Guardar Garantías (crear o actualizar)
        function saveProvider() {
            const provider = {
                id: editingProviderId || generateId(),
                name: document.getElementById('provider-name').value,
                idNumber: document.getElementById('provider-id-number').value,
                nit: document.getElementById('provider-nit').value,
                address: document.getElementById('provider-address').value,
                phone: document.getElementById('provider-phone').value
            };

            if (editingProviderId) {
                // Actualizar Grantías existente
                const index = providers.findIndex(p => p.id === editingProviderId);
                if (index !== -1) {
                    providers[index] = provider;
                    showAlert('Garantía actualizada correctamente', 'success');
                }
            } else {
                // Agregar nuevo Equipo
                providers.push(provider);
                showAlert('Garantía agregada correctamente', 'success');
            }

            // Volver a la lista y actualizar
            cancelForm();
            renderProvidersTable();
        }

        // Editar Garantía
        function editProvider(id) {
            const provider = providers.find(p => p.id === id);
            if (!provider) return;

            editingProviderId = id;

            // Llenar el formulario
            document.getElementById('provider-id').value = provider.id;
            document.getElementById('provider-name').value = provider.name;
            document.getElementById('provider-id-number').value = provider.idNumber;
            document.getElementById('provider-nit').value = provider.nit;
            document.getElementById('provider-address').value = provider.address;
            document.getElementById('provider-phone').value = provider.phone;

            // Mostrar el formulario
            document.getElementById('list-section').classList.add('hidden');
            document.getElementById('form-section').classList.remove('hidden');
            document.getElementById('form-title').textContent = 'Editar Garantía';
        }

        // Eliminar Garantía
        function deleteProvider(id) {
            if (confirm('¿Está seguro que desea eliminar esta Garantía?')) {
                providers = providers.filter(provider => provider.id !== id);
                renderProvidersTable();
                showAlert('Garantía eliminada correctamente', 'success');
            }
        }

        // Mostrar alerta
        function showAlert(message, type) {
            const alertPlaceholder = document.getElementById('alert-placeholder');
            const alert = document.createElement('div');
            alert.className = `alert alert-${type}`;
            alert.innerHTML = `
                ${message}
                <button style="float: right; background: none; border: none; cursor: pointer;" onclick="this.parentElement.remove()">
                    &times;
                </button>
            `;
            
            alertPlaceholder.innerHTML = '';
            alertPlaceholder.appendChild(alert);
            
            // Eliminar la alerta después de 5 segundos
            setTimeout(() => {
                alert.remove();
            }, 5000);
        }

        // Generar ID único
        function generateId() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        }