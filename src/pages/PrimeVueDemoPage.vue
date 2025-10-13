<template>
  <div class="primevue-demo-page">
    <div class="demo-container">
      <!-- Header -->
      <div class="demo-header">
        <h1>
          <i class="pi pi-sparkles"></i>
          PrimeVue Components Demo
        </h1>
        <p>Explore the beautiful PrimeVue component library</p>
      </div>

      <!-- Navigation Tabs -->
      <Tabs value="0">
        <TabList>
          <Tab value="0">Buttons & Inputs</Tab>
          <Tab value="1">Data Display</Tab>
          <Tab value="2">Overlays</Tab>
          <Tab value="3">Forms</Tab>
        </TabList>

        <!-- Tab 1: Buttons & Inputs -->
        <TabPanels>
          <TabPanel value="0">
            <div class="section">
              <h2>Buttons</h2>
              <div class="component-grid">
                <Button label="Primary" />
                <Button label="Success" severity="success" />
                <Button label="Info" severity="info" />
                <Button label="Warning" severity="warn" />
                <Button label="Danger" severity="danger" />
                <Button label="Help" severity="help" />
                <Button label="Secondary" severity="secondary" />
                <Button label="Contrast" severity="contrast" />
              </div>

              <h3>Icon Buttons</h3>
              <div class="component-grid">
                <Button icon="pi pi-check" label="Save" />
                <Button icon="pi pi-trash" label="Delete" severity="danger" />
                <Button icon="pi pi-search" label="Search" severity="info" />
                <Button icon="pi pi-user" label="Profile" severity="secondary" />
              </div>

              <h3>Button Sizes</h3>
              <div class="component-grid">
                <Button label="Small" size="small" />
                <Button label="Normal" />
                <Button label="Large" size="large" />
              </div>

              <h3>Outlined & Text Buttons</h3>
              <div class="component-grid">
                <Button label="Outlined" outlined />
                <Button label="Text" text />
                <Button label="Raised" raised />
                <Button label="Rounded" rounded />
              </div>
            </div>

            <div class="section">
              <h2>Input Fields</h2>
              <div class="form-grid">
                <div class="form-group">
                  <label>Basic Input</label>
                  <InputText v-model="demoInput" placeholder="Enter text..." />
                </div>

                <div class="form-group">
                  <label>Password</label>
                  <Password v-model="demoPassword" placeholder="Enter password..." toggleMask />
                </div>

                <div class="form-group">
                  <label>Number Input</label>
                  <InputNumber v-model="demoNumber" placeholder="Enter number..." />
                </div>

                <div class="form-group">
                  <label>Textarea</label>
                  <Textarea v-model="demoTextarea" rows="4" placeholder="Enter description..." />
                </div>
              </div>
            </div>
          </TabPanel>

          <!-- Tab 2: Data Display -->
          <TabPanel value="1">
            <div class="section">
              <h2>Data Table</h2>
              <DataTable :value="products" paginator :rows="5" tableStyle="min-width: 50rem">
                <Column field="id" header="ID" sortable></Column>
                <Column field="name" header="Name" sortable></Column>
                <Column field="category" header="Category" sortable></Column>
                <Column field="price" header="Price" sortable>
                  <template #body="slotProps">
                    ${{ slotProps.data.price.toFixed(2) }}
                  </template>
                </Column>
                <Column field="stock" header="Stock" sortable></Column>
              </DataTable>
            </div>

            <div class="section">
              <h2>Cards</h2>
              <div class="card-grid">
                <Card>
                  <template #title>Simple Card</template>
                  <template #content>
                    <p>This is a basic PrimeVue card component with title and content.</p>
                  </template>
                </Card>

                <Card>
                  <template #header>
                    <img alt="Card" src="https://primefaces.org/cdn/primevue/images/usercard.png" />
                  </template>
                  <template #title>Card with Image</template>
                  <template #content>
                    <p>Cards can include images in the header section.</p>
                  </template>
                  <template #footer>
                    <div class="flex gap-4 mt-1">
                      <Button label="Save" icon="pi pi-check" />
                      <Button label="Cancel" severity="secondary" icon="pi pi-times" />
                    </div>
                  </template>
                </Card>
              </div>
            </div>

            <div class="section">
              <h2>Tags & Badges</h2>
              <div class="component-grid">
                <Tag value="Primary" />
                <Tag severity="success" value="Success" />
                <Tag severity="info" value="Info" />
                <Tag severity="warn" value="Warning" />
                <Tag severity="danger" value="Danger" />
              </div>

              <h3>Badges</h3>
              <div class="component-grid">
                <Badge value="2" />
                <Badge value="8" severity="success" />
                <Badge value="4" severity="info" />
                <Badge value="12" severity="warn" />
                <Badge value="3" severity="danger" />
              </div>
            </div>
          </TabPanel>

          <!-- Tab 3: Overlays -->
          <TabPanel value="2">
            <div class="section">
              <h2>Dialog</h2>
              <Button label="Show Dialog" @click="dialogVisible = true" />
              <Dialog v-model:visible="dialogVisible" modal header="Dialog Header" :style="{ width: '30rem' }">
                <p class="mb-8">
                  This is a modal dialog. You can put any content here including forms, images, or other components.
                </p>
                <template #footer>
                  <Button label="Cancel" severity="secondary" @click="dialogVisible = false" />
                  <Button label="Save" @click="dialogVisible = false" />
                </template>
              </Dialog>
            </div>

            <div class="section">
              <h2>Toast Messages</h2>
              <div class="component-grid">
                <Button label="Success" severity="success" @click="showToast('success', 'Success', 'Operation completed successfully')" />
                <Button label="Info" severity="info" @click="showToast('info', 'Information', 'Here is some info')" />
                <Button label="Warning" severity="warn" @click="showToast('warn', 'Warning', 'Please be careful')" />
                <Button label="Error" severity="danger" @click="showToast('error', 'Error', 'Something went wrong')" />
              </div>
              <Toast />
            </div>

            <div class="section">
              <h2>Confirm Dialog</h2>
              <Button label="Delete Item" severity="danger" @click="confirm" />
              <ConfirmDialog />
            </div>

            <div class="section">
              <h2>Menu</h2>
              <Button label="Show Menu" @click="toggleMenu" />
              <Menu ref="menu" :model="menuItems" popup />
            </div>
          </TabPanel>

          <!-- Tab 4: Forms -->
          <TabPanel value="3">
            <div class="section">
              <h2>Form Components</h2>

              <div class="form-grid">
                <div class="form-group">
                  <label>Dropdown</label>
                  <Select v-model="selectedCity" :options="cities" optionLabel="name" placeholder="Select a City" />
                </div>

                <div class="form-group">
                  <label>Multi Select</label>
                  <MultiSelect v-model="selectedCities" :options="cities" optionLabel="name" placeholder="Select Cities" />
                </div>

                <div class="form-group">
                  <label>AutoComplete</label>
                  <AutoComplete v-model="selectedCountry" :suggestions="filteredCountries" @complete="searchCountry" optionLabel="name" placeholder="Search Country" />
                </div>

                <div class="form-group">
                  <label>Calendar</label>
                  <DatePicker v-model="selectedDate" showIcon placeholder="Select Date" />
                </div>

                <div class="form-group">
                  <label>Checkbox</label>
                  <div class="flex flex-col gap-3">
                    <div class="flex items-center gap-2">
                      <Checkbox v-model="checked1" inputId="cb1" :binary="true" />
                      <label for="cb1">Option 1</label>
                    </div>
                    <div class="flex items-center gap-2">
                      <Checkbox v-model="checked2" inputId="cb2" :binary="true" />
                      <label for="cb2">Option 2</label>
                    </div>
                  </div>
                </div>

                <div class="form-group">
                  <label>Radio Buttons</label>
                  <div class="flex flex-col gap-3">
                    <div class="flex items-center gap-2">
                      <RadioButton v-model="selectedOption" inputId="option1" value="Option 1" />
                      <label for="option1">Option 1</label>
                    </div>
                    <div class="flex items-center gap-2">
                      <RadioButton v-model="selectedOption" inputId="option2" value="Option 2" />
                      <label for="option2">Option 2</label>
                    </div>
                  </div>
                </div>

                <div class="form-group">
                  <label>Toggle Switch</label>
                  <ToggleSwitch v-model="toggleValue" />
                </div>

                <div class="form-group">
                  <label>Slider</label>
                  <Slider v-model="sliderValue" />
                  <p class="mt-2">Value: {{ sliderValue }}</p>
                </div>

                <div class="form-group">
                  <label>Rating</label>
                  <Rating v-model="ratingValue" />
                </div>

                <div class="form-group">
                  <label>Chips (Tags Input)</label>
                  <Chips v-model="chipsValue" placeholder="Add tags..." />
                </div>
              </div>
            </div>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useToast } from 'primevue/usetoast'
import { useConfirm } from 'primevue/useconfirm'

import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import InputNumber from 'primevue/inputnumber'
import Textarea from 'primevue/textarea'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Card from 'primevue/card'
import Tag from 'primevue/tag'
import Badge from 'primevue/badge'
import Dialog from 'primevue/dialog'
import Toast from 'primevue/toast'
import ConfirmDialog from 'primevue/confirmdialog'
import Menu from 'primevue/menu'
import Select from 'primevue/select'
import MultiSelect from 'primevue/multiselect'
import AutoComplete from 'primevue/autocomplete'
import DatePicker from 'primevue/datepicker'
import Checkbox from 'primevue/checkbox'
import RadioButton from 'primevue/radiobutton'
import ToggleSwitch from 'primevue/toggleswitch'
import Slider from 'primevue/slider'
import Rating from 'primevue/rating'
import Chips from 'primevue/chips'
import Tabs from 'primevue/tabs'
import TabList from 'primevue/tablist'
import Tab from 'primevue/tab'
import TabPanels from 'primevue/tabpanels'
import TabPanel from 'primevue/tabpanel'

export default {
  name: 'PrimeVueDemoPage',
  components: {
    Button,
    InputText,
    Password,
    InputNumber,
    Textarea,
    DataTable,
    Column,
    Card,
    Tag,
    Badge,
    Dialog,
    Toast,
    ConfirmDialog,
    Menu,
    Select,
    MultiSelect,
    AutoComplete,
    DatePicker,
    Checkbox,
    RadioButton,
    ToggleSwitch,
    Slider,
    Rating,
    Chips,
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel
  },
  setup() {
    const toast = useToast()
    const confirmDialog = useConfirm()
    const menu = ref()

    // Form data
    const demoInput = ref('')
    const demoPassword = ref('')
    const demoNumber = ref(null)
    const demoTextarea = ref('')

    const dialogVisible = ref(false)

    const selectedCity = ref(null)
    const selectedCities = ref(null)
    const selectedCountry = ref(null)
    const filteredCountries = ref([])
    const selectedDate = ref(null)
    const checked1 = ref(false)
    const checked2 = ref(false)
    const selectedOption = ref(null)
    const toggleValue = ref(false)
    const sliderValue = ref(50)
    const ratingValue = ref(null)
    const chipsValue = ref([])

    const cities = ref([
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' }
    ])

    const countries = ref([
      { name: 'Australia', code: 'AU' },
      { name: 'Brazil', code: 'BR' },
      { name: 'China', code: 'CN' },
      { name: 'Egypt', code: 'EG' },
      { name: 'France', code: 'FR' },
      { name: 'Germany', code: 'DE' },
      { name: 'India', code: 'IN' },
      { name: 'Japan', code: 'JP' },
      { name: 'Spain', code: 'ES' },
      { name: 'United States', code: 'US' }
    ])

    const products = ref([
      { id: 1, name: 'Laptop', category: 'Electronics', price: 999.99, stock: 15 },
      { id: 2, name: 'Smartphone', category: 'Electronics', price: 699.99, stock: 25 },
      { id: 3, name: 'Headphones', category: 'Audio', price: 149.99, stock: 50 },
      { id: 4, name: 'Keyboard', category: 'Accessories', price: 79.99, stock: 30 },
      { id: 5, name: 'Mouse', category: 'Accessories', price: 49.99, stock: 40 },
      { id: 6, name: 'Monitor', category: 'Electronics', price: 299.99, stock: 20 },
      { id: 7, name: 'Webcam', category: 'Electronics', price: 89.99, stock: 35 }
    ])

    const menuItems = ref([
      {
        label: 'Options',
        items: [
          {
            label: 'Update',
            icon: 'pi pi-refresh',
            command: () => {
              toast.add({ severity: 'success', summary: 'Updated', detail: 'Data Updated', life: 3000 })
            }
          },
          {
            label: 'Delete',
            icon: 'pi pi-trash',
            command: () => {
              toast.add({ severity: 'warn', summary: 'Delete', detail: 'Data Deleted', life: 3000 })
            }
          }
        ]
      },
      {
        label: 'Navigate',
        items: [
          {
            label: 'Home',
            icon: 'pi pi-home',
            command: () => {
              window.location.href = '/'
            }
          },
          {
            label: 'Products',
            icon: 'pi pi-shopping-bag',
            command: () => {
              window.location.href = '/products'
            }
          }
        ]
      }
    ])

    const showToast = (severity, summary, detail) => {
      toast.add({ severity, summary, detail, life: 3000 })
    }

    const confirm = () => {
      confirmDialog.require({
        message: 'Are you sure you want to proceed?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        acceptClass: 'p-button-danger',
        accept: () => {
          toast.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 })
        },
        reject: () => {
          toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 })
        }
      })
    }

    const toggleMenu = (event) => {
      menu.value.toggle(event)
    }

    const searchCountry = (event) => {
      const query = event.query.toLowerCase()
      filteredCountries.value = countries.value.filter(country =>
        country.name.toLowerCase().includes(query)
      )
    }

    return {
      demoInput,
      demoPassword,
      demoNumber,
      demoTextarea,
      dialogVisible,
      selectedCity,
      selectedCities,
      selectedCountry,
      filteredCountries,
      selectedDate,
      checked1,
      checked2,
      selectedOption,
      toggleValue,
      sliderValue,
      ratingValue,
      chipsValue,
      cities,
      countries,
      products,
      menuItems,
      menu,
      showToast,
      confirm,
      toggleMenu,
      searchCountry
    }
  }
}
</script>

<style scoped>
.primevue-demo-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 40px 20px;
}

.demo-container {
  max-width: 1400px;
  margin: 0 auto;
}

.demo-header {
  text-align: center;
  background: white;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  margin-bottom: 32px;
}

.demo-header h1 {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin: 0 0 12px 0;
  color: #1f2937;
  font-size: 2.5rem;
}

.demo-header h1 i {
  color: #667eea;
}

.demo-header p {
  margin: 0;
  color: #6b7280;
  font-size: 1.2rem;
}

.section {
  background: white;
  padding: 32px;
  border-radius: 16px;
  margin-bottom: 24px;
}

.section h2 {
  margin: 0 0 24px 0;
  color: #1f2937;
  font-size: 1.8rem;
  border-bottom: 3px solid #667eea;
  padding-bottom: 12px;
}

.section h3 {
  margin: 32px 0 16px 0;
  color: #374151;
  font-size: 1.3rem;
}

.component-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-weight: 600;
  color: #374151;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}

@media (max-width: 768px) {
  .demo-header h1 {
    font-size: 1.8rem;
  }

  .section {
    padding: 20px;
  }

  .form-grid {
    grid-template-columns: 1fr;
  }
}
</style>
