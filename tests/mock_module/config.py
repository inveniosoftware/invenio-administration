# SPDX-FileCopyrightText: 2022 CERN.
# SPDX-License-Identifier: MIT

"""Mock service configuration."""

from invenio_records_resources.services import RecordServiceConfig


class ServiceConfig(RecordServiceConfig):
    """Mock service configuration.

    Needs both configs, with File overwritting the record ones.
    """

    permission_policy_cls = None
    record_cls = None
    schema = None
