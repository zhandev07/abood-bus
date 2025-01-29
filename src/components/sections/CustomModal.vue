<template>
  <div>
    <!-- Modal -->
    <div class="modal fade" tabindex="-1" aria-labelledby="modalLabel" aria-hidden="true" v-show="isModalVisible" @click.self="closeModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modalLabel">Confirmation</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="closeModal"></button>
          </div>
          <div class="modal-body">
            <p>{{ modalContent }}</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="cancelAction">Cancel</button>
            <button type="button" class="btn btn-primary" @click="confirmAction">Ok</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// Import Bootstrap if not already globally available
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 

export default {
  data() {
    return {
      isModalVisible: false, // Controls modal visibility
      modalContent: "Please confirm your action.",
    };
  },
  methods: {
    showModal(content) {
      this.modalContent = content;  // Update the modal content
      this.isModalVisible = true;   // Show the modal
      this.$nextTick(() => {
        const modalElement = new bootstrap.Modal(document.querySelector('.modal'));
        modalElement.show();  // Bootstrap 5's modal show function
      });
    },
    confirmAction() {
      this.closeModal();
      this.$emit('confirmed');
    },
    cancelAction() {
      this.closeModal();
      this.$emit('canceled');
    },
    closeModal() {
      this.isModalVisible = false;
      const modalElement = new bootstrap.Modal(document.querySelector('.modal'));
      modalElement.hide(); 
    },
  },
};
</script>

<style scoped>
.modal-body {
  text-align: center;
}
</style>
