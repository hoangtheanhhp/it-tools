<template>

      <n-form-item label="Search Term">
        <n-input v-model:value="searchTerm" placeholder="Enter search term" />
      </n-form-item>
      <n-form-item label="Ngân hàng">
        <n-input v-model:value="bank" placeholder="Nhập tên ngân hàng" />
      </n-form-item>
      <n-form-item label="Mã giao dịch">
        <n-input v-model:value="code" placeholder="Nhập mã giao dịch" />
      </n-form-item>
      <n-form-item label="Ngày">
        <n-date-picker v-model:value="date" type="date" />
      </n-form-item>
      <n-form-item label="Số tiền">
        <n-input-number v-model:value="amount" placeholder="Nhập số tiền" />
      </n-form-item>
      <n-form-item>
        <n-button @click="searchTransactions" type="primary">Search</n-button>
      </n-form-item>
    <n-data-table
      :columns="columns"
      :data="transactions"
      :pagination="paginationReactive"
      :max-height="500"
    />
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';

const API_URL = import.meta.env.VITE_API_URL;
interface Transaction {
  date: Date;
  amount: number;
  notes: string | null;
  code: string;
  bank: string | null;
}

const searchTerm = ref('');
const bank = ref('');
const code = ref('');
const date = ref(null);
const amount = ref(0);
const transactions = ref<Transaction[]>([]);

const columns = [
  { title: 'Amount', key: 'amount' },
  { title: 'Date', key: 'date' },
  { title: 'Notes', key: 'notes' }, // Ensure this matches your data
  { title: 'Code', key: 'code' },
  { title: 'Bank', key: 'bank' },
];

const paginationReactive = reactive({
  page: 1,
  pageSize: 10,
  showSizePicker: true,
  pageSizes: [5, 10, 20],
  total: 0,
  onChange: (page: number) => {
    paginationReactive.page = page;
    searchTransactions();
  },
  onUpdatePageSize: (pageSize: number) => {
    paginationReactive.pageSize = pageSize;
    paginationReactive.page = 1;
    searchTransactions();
  }
});

async function searchTransactions() {
  const queryParams = new URLSearchParams({
    searchTerm: searchTerm.value,
    bank: bank.value,
    code: code.value,
    date: date.value ? new Date(date.value).toISOString() : '',
    amount: amount.value.toString(),
    limit: paginationReactive.pageSize.toString(),
    page: paginationReactive.page.toString()
  });

  fetch(`${API_URL}/api/transaction?${queryParams}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  })
  .then(response => response.json())
  .then(data => {
    transactions.value = data.transactions;
    paginationReactive.total = data.totalCount;
    console.log(data);
  })
  .catch(error => {
    console.error('Error:', error);
  });
}

// onMounted(async () => {
//   transactions.value = await prisma.transaction.findMany();
// });
</script>
