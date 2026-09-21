#!/bin/bash

read -p "Enter feature name: " FEATURE

if [ -z "$FEATURE" ]; then
    echo "Feature name cannot be empty."
    exit 1
fi

FEATURE_DIR="src/modules/$FEATURE"

mkdir -p "$FEATURE_DIR"

touch \
    "$FEATURE_DIR/$FEATURE.controller.ts" \
    "$FEATURE_DIR/$FEATURE.service.ts" \
    "$FEATURE_DIR/$FEATURE.repository.ts" \
    "$FEATURE_DIR/$FEATURE.routes.ts" \
    "$FEATURE_DIR/$FEATURE.validation.ts" \
    "$FEATURE_DIR/$FEATURE.types.ts" \
    "$FEATURE_DIR/$FEATURE.model.ts"

echo ""
echo "Feature '$FEATURE' created successfully!"
echo ""
tree "$FEATURE_DIR"