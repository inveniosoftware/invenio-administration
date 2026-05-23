/*
 * SPDX-FileCopyrightText: 2022 CERN.
 * SPDX-License-Identifier: MIT
 */

export const errorSerializer = (error) =>
  error?.response?.data?.message || error?.message;
