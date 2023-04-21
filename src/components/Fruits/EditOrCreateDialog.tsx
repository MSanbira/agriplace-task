import React from "react";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { Fruit } from "types/Fruit";
import { Tag } from "types/Tag";
import { Vegetable } from "types/Vegetable";

export const EditOrCreateDialog = (props: EditOrCreateDialogProps) => {
  const { entity, entityType, tags, setEntity, saveEntity, isLoading } = props;

  const handleCloseDialog = () => setEntity(null);

  return (
    <Dialog open={!!entity} onClose={handleCloseDialog} maxWidth="xl">
      <DialogTitle>Edit {entityType}</DialogTitle>
      <DialogContent sx={{ display: "grid", gap: 2, minWidth: "30vw" }}>
        <TextField
          value={entity?.name || ""}
          onChange={(e) =>
            setEntity({ ...entity!, name: e.currentTarget.value })
          }
          label="name"
        />
        <TextField
          value={entity?.description || ""}
          onChange={(e) =>
            setEntity({ ...entity!, description: e.currentTarget.value })
          }
          multiline
          rows={4}
          label="description"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog}>cancel</Button>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <Button
            color="primary"
            variant="contained"
            onClick={saveEntity}
            disabled={!entity?.name}
          >
            {entity?.id ? 'Save' : 'Add'}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

interface EditOrCreateDialogProps {
  entity: Fruit | Vegetable | null;
  entityType: string;
  tags: Tag[];
  setEntity: (entity: Fruit | Vegetable | null) => void;
  saveEntity: () => void;
  isLoading: boolean;
}
